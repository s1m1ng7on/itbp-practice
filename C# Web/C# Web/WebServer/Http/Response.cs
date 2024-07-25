namespace WebServer.Http
{
    public class Response
    {
        public StatusCode StatusCode { get; init; }
        public HeaderCollection Headers { get; } = new HeaderCollection();
        public string Body { get; set; }
        public Action<Request, Response> PreRenderAction { get; protected set; }

        public Response(StatusCode statusCode)
        {
            StatusCode = statusCode;
        }

        public override string ToString()
        {
            return $"HTTP/1.1 {(int)StatusCode} {StatusCode}\n" +
                $"{Headers}\n" +
                $"\n" +
                $"{Body}";
        }
    }
}
