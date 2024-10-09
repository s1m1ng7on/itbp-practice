using WebServer.Http;

namespace WebServer.Attributes
{
    public class POSTAttribute : MethodAttribute
    {
        public POSTAttribute() : base(Method.POST) { }
    }
}
