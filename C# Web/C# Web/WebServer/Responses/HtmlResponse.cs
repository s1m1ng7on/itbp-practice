using WebServer.Http;

namespace WebServer.Responses
{
    public class HtmlResponse : ContentResponse
    {
        public HtmlResponse(string html, Action<Request, Response> preRenderAction = null) : base(html, ContentType.Html, preRenderAction) { }
    }
}
