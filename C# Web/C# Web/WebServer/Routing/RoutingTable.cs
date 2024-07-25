using WebServer.Common;
using WebServer.Http;
using WebServer.Responses;

namespace WebServer.Routing
{
    public class RoutingTable : IRoutingTable
    {
        private readonly Dictionary<Method, Dictionary<string, Response>> routes;

        public RoutingTable() => routes = new()
        {
            [Method.GET] = new(),
            [Method.POST] = new(),
            [Method.PUT] = new(),
            [Method.DELETE] = new(),
        };

        public IRoutingTable Map(Method method, string path, Response response)
        {
            Guard.AgainstNull(path, nameof(path));
            Guard.AgainstNull(response, nameof(response));

            switch (method)
            {
                case Method.GET:
                    return MapGet(path, response);
                case Method.POST:
                    return MapPost(path, response);
                case Method.PUT:
                case Method.DELETE:
                default:
                    throw new ArgumentOutOfRangeException($"The method {nameof(method)} is not supported!");
            }
        }

        public IRoutingTable MapGet(string path, Response response)
        {
            Guard.AgainstDuplicatedKey(routes[Method.GET], path, "RoutingTable.GET");
            routes[Method.GET][path] = response;

            return this;
        }

        public IRoutingTable MapPost(string path, Response response)
        {
            Guard.AgainstDuplicatedKey(routes[Method.POST], path, "RoutingTable.POST");
            routes[Method.POST][path] = response;

            return this;
        }

        public Response MatchRequest(Request request)
        {
            Method requestMethod = request.Method;
            string requestUrl = request.Url;

            if (!routes.ContainsKey(requestMethod) || !routes[requestMethod].ContainsKey(requestUrl))
            {
                return new NotFoundResponse();
            }

            return routes[requestMethod][requestUrl];
        }
    }
}
