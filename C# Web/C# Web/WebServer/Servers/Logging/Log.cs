using WebServer.Http;

namespace WebServer.Servers.Logging
{
    public class Log
    {
        private string statusCodeColor;

        public DateTime DateTime { get; init; }
        public Request Request { get; init; }
        public Response Response { get; init; }

        public string StatusCodeColor
        {
            get
            {
                if (statusCodeColor == null)
                    statusCodeColor = $"\u001b{(int)Response.StatusCode switch
                    {
                        >= 100 and < 200 => "[34m",
                        >= 200 and < 300 => "[32m",
                        >= 300 and < 400 => "[94m",
                        >= 400 and < 500 => "[31m",
                        >= 500 and < 600 => "[33m",
                        _ => "[0m"
                    }}";

                return statusCodeColor;
            }
        }

        public Log(Request request, Response response)
        {
            DateTime = DateTime.Now;
            Request = request;
            Response = response;
        }

        public string Short => $"\u001b[90m[{DateTime.ToString("yyyy-MM-dd HH:mm:ss.fff")} -- {Request.ClientIp}]\u001b[0m {Request.Method} {Request.Path} => {StatusCodeColor}{(int)Response.StatusCode} {Response.StatusCode}\u001b[0m";

        public string Detailed => $"[{DateTime.ToString("yyyy-MM-dd HH:mm:ss.fff")}] {Request.ClientIp}\n" +
            $"{Request}\n" +
            "--------------------------------------\n" +
            $"{Response}\n";
    }
}
