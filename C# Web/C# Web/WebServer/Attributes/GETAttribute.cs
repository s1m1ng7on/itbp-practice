using WebServer.Http;

namespace WebServer.Attributes
{
    public class GETAttribute : MethodAttribute
    {
        public GETAttribute() : base(Method.GET) { }
    }
}
