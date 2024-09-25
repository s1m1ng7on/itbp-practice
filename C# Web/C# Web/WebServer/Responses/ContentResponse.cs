using WebServer.Common;
using WebServer.Http;

namespace WebServer.Responses
{
    public class ContentResponse : Response
    {
        public ContentResponse(string content, string contentType) : base(StatusCode.OK)
        {
            Guard.AgainstNull(content);
            Guard.AgainstNull(contentType);

            Headers.Add("Content-Type", contentType);
            Body = content;
        }
    }
}
