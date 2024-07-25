namespace WebServer.Http
{
    public class Request
    {
        public Method Method { get; private set; }
        public string Url { get; private set; }
        public HeaderCollection Headers { get; private set; }
        public string Body { get; private set; }

        public static Request Parse(string request)
        {
            string[] requestLines = request.Split("\r\n");

            string[] requestLineArgs = requestLines.First().Split(" ");

            Method method = ParseMethod(requestLineArgs[0]);
            string url = requestLineArgs[1];
            HeaderCollection headers = ParseHeaders(requestLines.Skip(1).ToArray());
            string body = string.Join("\r\n", requestLines.Skip(headers.Count + 2));

            return new Request()
            {
                Method = method,
                Url = url,
                Headers = headers,
                Body = body,
            };
        }

        private static Method ParseMethod(string method)
        {
            try
            {
                return Enum.Parse<Method>(method);
            }
            catch (Exception)
            {
                throw new InvalidOperationException($"Method {method} is not supported");
            }
        }

        private static HeaderCollection ParseHeaders(string[] headerLines)
        {
            HeaderCollection headers = new HeaderCollection();

            string line;
            int index = 0;
            while ((line = headerLines[index]) != String.Empty)
            {
                string[] headerArgs = line.Split(": ");

                if (headerArgs.Length != 2)
                    throw new InvalidOperationException("Request headers invalid");

                headers.Add(headerArgs[0], headerArgs[1]);
                index++;
            }

            return headers;
        }
    }
}
