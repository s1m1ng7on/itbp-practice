namespace WebServer.Http
{
    public class Response
    {
        public StatusCode StatusCode { get; init; }
        public HeaderCollection Headers { get; private set; } = new HeaderCollection();
        public CookieCollection Cookies { get; private set; } = new CookieCollection();
        public string Body { get; set; }
        public byte[] FileContent { get; set; }
        public Action<Request, Response> PreRenderAction { get; protected set; }

        public Response(StatusCode statusCode) => StatusCode = statusCode;

        public override string ToString()
        {
            return $"HTTP/1.1 {(int)StatusCode} {StatusCode}\n" +
                $"{Headers}\n" +
                (Cookies.Count > 0 ? $"{Cookies}\n" : string.Empty) +
                $"\n" +
                Body;
        }
    }
}