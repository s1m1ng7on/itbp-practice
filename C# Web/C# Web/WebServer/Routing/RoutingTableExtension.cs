using System.Reflection;
using System.Runtime.CompilerServices;
using WebServer.Attributes;
using WebServer.Controllers;
using WebServer.Http;

namespace WebServer.Routing
{
    public static class RoutingTableExtension
    {
        public static IRoutingTable MapGet<TController>(this IRoutingTable routingTable, string path, Func<TController, Response> controllerFunction) where TController : Controller
            => routingTable.Map(Method.GET, path, request => controllerFunction(CreateController<TController>(request)));

        public static IRoutingTable MapPost<TController>(this IRoutingTable routingTable, string path, Func<TController, Response> controllerFunction) where TController : Controller
            => routingTable.Map(Method.POST, path, request => controllerFunction(CreateController<TController>(request)));

        public static IRoutingTable MapControllers(this IRoutingTable routingTable)
        {
            MethodInfo[] controllerActions = GetControllerActions();

            foreach (MethodInfo controllerAction in controllerActions)
            {
                string controllerName = controllerAction.DeclaringType.Name.Replace(nameof(Controller), string.Empty);
                string actionName = controllerAction.Name;
                string path = $"/{controllerName}/{actionName}";

                var responseFunction = GetResponseFunction(controllerAction);

                MethodAttribute actionMethodAttribute = controllerAction.GetCustomAttribute<MethodAttribute>();
                Method method = actionMethodAttribute != null ? actionMethodAttribute.Method : Method.GET;

                routingTable.Map(method, path, responseFunction);

                MapDefaultRoutes(routingTable, method, controllerName, actionName, responseFunction);
            }

            return routingTable;
        }

        public static IRoutingTable MapStaticFiles(this IRoutingTable routingTable, string folder = "wwwroot")
        {
            string currentDirectory = Directory.GetCurrentDirectory();
            string staticFilesFolder = Path.Combine(currentDirectory, folder);

            if (!Directory.Exists(staticFilesFolder))
                return routingTable;

            string[] staticFiles = Directory.GetFiles(staticFilesFolder, "*.*", SearchOption.AllDirectories);

            foreach (string file in staticFiles)
            {
                string relativePath = Path.GetRelativePath(staticFilesFolder, file);
                string urlPath = $"/{relativePath.Replace("\\", "/")}";

                routingTable.Map(Method.GET, urlPath, request =>
                {
                    byte[] content = File.ReadAllBytes(file);
                    string extension = Path.GetExtension(file).Trim('.');
                    string name = Path.GetFileName(file);
                    string contentType = ContentType.GetByFileExtension(extension);

                    return new Response(StatusCode.OK)
                    {
                        FileContent = content
                    };
                });
            }

            return routingTable;
        }

        private static TController CreateController<TController>(Request request)
            => (TController)Activator.CreateInstance(typeof(TController), new[] { request });

        private static Controller CreateController(Type controllerType, Request request)
        {
            Controller controller = (Controller)Request.ServiceCollection.CreateInstance(controllerType);

            controllerType
                .GetProperty("Request", BindingFlags.Instance | BindingFlags.NonPublic)
                .SetValue(controller, request);

            return controller;
        }

        private static MethodInfo[] GetControllerActions()
            => Assembly
            .GetEntryAssembly()
            .GetExportedTypes()
            .Where(t => !t.IsAbstract)
            .Where(t => t.IsAssignableTo(typeof(Controller)))
            .Where(t => t.Name.EndsWith(nameof(Controller)))
            .SelectMany(c => c
                .GetMethods(BindingFlags.Instance | BindingFlags.Public)
                .Where(m => m.ReturnType.IsAssignableTo(typeof(Response)))
            ).ToArray();

        private static Func<Request, Response> GetResponseFunction(MethodInfo controllerAction)
            => request =>
            {
                if (!UserIsAuthorized(controllerAction, request.Session))
                    return new Response(StatusCode.Unauthorized);

                Controller controllerInstance = CreateController(controllerAction.DeclaringType, request);
                var parameterValues = GetParameterValues(controllerAction, request);

                return (Response)controllerAction.Invoke(controllerInstance, parameterValues);
            };

        private static bool UserIsAuthorized(MethodInfo controllerAction, Session session)
        {
            AuthorizeAttribute authorizationRequired = controllerAction.DeclaringType.GetCustomAttribute<AuthorizeAttribute>() ?? controllerAction.GetCustomAttribute<AuthorizeAttribute>();

            if (authorizationRequired != null)
            {
                bool userIsAuthorized = session.ContainsKey(Session.UserKey) && session[Session.UserKey] != null;

                if (!userIsAuthorized)
                    return false;
            }

            return true;
        }

        private static object[] GetParameterValues(MethodInfo controllerAction, Request request)
        {
            var actionParameters = controllerAction
                .GetParameters()
                .Select(p => new
                {
                    p.Name,
                    p.ParameterType
                })
                .ToArray();

            object[] parameterValues = new object[actionParameters.Length];

            for (int i = 0; i < actionParameters.Length; i++)
            {
                var parameter = actionParameters[i];

                if (parameter.ParameterType.IsPrimitive || parameter.ParameterType == typeof(string))
                {
                    string parameterValue = request.GetValue(parameter.Name);
                    parameterValues[i] = Convert.ChangeType(parameterValue, parameter.ParameterType);
                }
                else
                {
                    object parameterValue = Activator.CreateInstance(parameter.ParameterType);
                    PropertyInfo[] parameterProperties = parameter.ParameterType.GetProperties();

                    foreach (PropertyInfo property in parameterProperties)
                    {
                        var propertyValue = property.GetValue(property.Name);
                        property.SetValue(parameterValue, Convert.ChangeType(propertyValue, property.PropertyType));
                    }

                    parameterValues[i] = parameterValue;
                }
            }

            return parameterValues;
        }

        private static string GetValue(this Request request, string name)
            => request.Parameters.GetValueOrDefault(name) ?? request.Form.GetValueOrDefault(name);

        private static void MapDefaultRoutes(IRoutingTable routingTable, Method method, string controllerName, string actionName, Func<Request, Response> responseFunction)
        {
            const string defaultActionName = "Index";
            const string defaultControllerName = "Home";

            if (actionName == defaultActionName)
            {
                routingTable.Map(method, $"/{controllerName}", responseFunction);

                if (controllerName == defaultControllerName)
                    routingTable.Map(method, "/", responseFunction);
            }
        }
    }
}
