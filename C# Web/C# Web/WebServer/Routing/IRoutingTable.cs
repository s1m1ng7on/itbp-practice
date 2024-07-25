using WebServer.Http;

namespace WebServer.Routing
{
    public interface IRoutingTable
    {
        IRoutingTable Map(Method method, string path, Response response);
        IRoutingTable MapGet(string path,  Response response);
        IRoutingTable MapPost(string path, Response response);
    }
}
