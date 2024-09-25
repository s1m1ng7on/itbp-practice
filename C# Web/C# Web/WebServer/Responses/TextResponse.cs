using WebServer.Http;

namespace WebServer.Responses
{
    public class TextResponse : ContentResponse
    {
        public TextResponse(string text) : base(text, ContentType.PlainText) { }
    }
}
