using WebServer.Common;
using WebServer.Http;
using WebServer.Responses;

namespace WebServer.Routing
{
    public class RoutingTable : IRoutingTable
    {
        private readonly Dictionary<Method, Dictionary<string, Func<Request, Response>>> routes;

        public RoutingTable() => routes = new()
        {
            [Method.GET] = new(StringComparer.InvariantCultureIgnoreCase),
            [Method.POST] = new(StringComparer.InvariantCultureIgnoreCase),
            [Method.PUT] = new(StringComparer.InvariantCultureIgnoreCase),
            [Method.DELETE] = new(StringComparer.InvariantCultureIgnoreCase),
        };

        public IRoutingTable Map(Method method, string path, Func<Request, Response> responseFunction)
        {
            Guard.AgainstNull(path, nameof(path));
            Guard.AgainstNull(responseFunction, nameof(responseFunction));
            Guard.AgainstDuplicatedKey(routes[method], path, method.ToString());

            routes[method][path] = responseFunction;

            return this;
        }

        public Response MatchRequest(Request request)
        {
            Method requestMethod = request.Method;
            string requestPath = request.Path;

            if (!routes.ContainsKey(requestMethod) || !routes[requestMethod].ContainsKey(requestPath))
                return new NotFoundResponse();

            Func<Request, Response> responseFunction = routes[requestMethod][requestPath];

            return responseFunction(request);
        }
    }
}
