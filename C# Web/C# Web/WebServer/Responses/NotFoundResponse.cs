using WebServer.Http;

namespace WebServer.Responses
{
    public class NotFoundResponse : Response
    {
        public NotFoundResponse() : base(StatusCode.NotFound) { }
    }
}
