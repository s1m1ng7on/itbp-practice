using WebServer.Http;

namespace WebServer.Responses
{
    public class HtmlResponse : ContentResponse
    {
        public HtmlResponse(string html) : base(html, ContentType.Html) { }
    }
}
