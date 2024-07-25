using WebServer.Common;
using WebServer.Http;

namespace WebServer.Responses
{
    public class ContentResponse : Response
    {
        public ContentResponse(string content, string contentType, Action<Request, Response> preRenderAction = null) : base(StatusCode.OK)
        {
            Guard.AgainstNull(content);
            Guard.AgainstNull(contentType);

            PreRenderAction = preRenderAction;
            Headers.Add("Content-Type", contentType);
            Body = content;
        }
    }
}
