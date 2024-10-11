using System.Web;
using WebServer.Common;
using WebServer.Views;

namespace WebServer.Http
{
    public class Request
    {
        private static Dictionary<string, Session> Sessions = new Dictionary<string, Session>();

        public Method Method { get; private set; }
        public string Path { get; private set; }
        public IReadOnlyDictionary<string, string> Parameters { get; private set; }
        public HeaderCollection Headers { get; private set; }
        public CookieCollection Cookies { get; private set; }
        public string Body { get; private set; }
        public IReadOnlyDictionary<string, string> Form { get; private set; }
        public Session Session { get; private set; }
        public static IServiceCollection ServiceCollection { get; private set;}
        public static ViewCollection Views { get; set; }
        public string ClientIp { get; private set; }

        public static Request Parse(string request, IServiceCollection serviceCollection, ViewCollection viewCollection, string clientIp)
        {
            ServiceCollection = serviceCollection;
            Views = viewCollection;

            string[] requestLines = request.Split("\r\n");

            string[] requestLineArgs = requestLines.First().Split(" ");

            Method method = ParseMethod(requestLineArgs[0]);
            string url = requestLineArgs[1];
            string[] pathAndQuery = url.Split('?');

            string path = pathAndQuery[0].ToLower();
            string? query = pathAndQuery.Length > 1 ? HttpUtility.UrlDecode(pathAndQuery[1]) : null;

            Dictionary<string, string> parameters = ParseParameters(query);
            HeaderCollection headers = ParseHeaders(requestLines.Skip(1).ToArray());
            CookieCollection cookies = ParseCookies(headers);
            Session session = GetSession(cookies);
            string body = string.Join("\r\n", requestLines.Skip(headers.Count + 2));
            Dictionary<string, string> form = ParseForm(headers, body);

            return new Request()
            {
                Method = method,
                Path = path,
                Parameters = parameters,
                Headers = headers,
                Cookies = cookies,
                Body = body,
                Form = form,
                Session = session,
                ClientIp = clientIp
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

        private static Dictionary<string, string> ParseParameters(string query)
        {
            Dictionary<string, string> parameters = new Dictionary<string, string>();

            if (query != null)
            {
                string[] parameterPairs = query.Split("&");
                foreach (string parameter in parameterPairs)
                {
                    string[] parameterArgs = parameter.Split("=");

                    if (parameterArgs.Length != 2)
                        throw new InvalidOperationException("Parameter invalid");

                    parameters.Add(parameterArgs[0], parameterArgs[1]);
                }
            }

            return parameters;
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

        private static CookieCollection ParseCookies(HeaderCollection headers)
        {
            CookieCollection cookieCollection = new CookieCollection();

            if (headers.Contains(Header.Cookie))
            {
                string[] cookies = headers[Header.Cookie].Split("; ");

                foreach (string cookie in cookies)
                {
                    string[] cookieArgs = cookie.Split("=");
                    cookieCollection.Add(cookieArgs[0], cookieArgs[1]);
                }
            }

            return cookieCollection;
        }

        private static Session GetSession(CookieCollection cookies)
        {
            string sessionId = cookies.Contains(Session.CookieName)
                ? cookies[Session.CookieName]
                : Guid.NewGuid().ToString();

            if (!Sessions.ContainsKey(sessionId))
                Sessions[sessionId] = new Session(sessionId);

            return Sessions[sessionId];
        }

        private static Dictionary<string, string> ParseForm(HeaderCollection headers, string body)
        {
            Dictionary<string, string> formCollection = new Dictionary<string, string>();

            if (headers.Contains(Header.ContentType) && headers[Header.ContentType] == ContentType.FormUrlEncoded)
            {
                Dictionary<string, string> parsedFormData = ParseFormData(body);

                foreach (KeyValuePair<string, string> pair in parsedFormData)
                    formCollection.Add(pair.Key, pair.Value);
            }

            return formCollection;
        }

        private static Dictionary<string, string> ParseFormData(string body)
            => HttpUtility.UrlDecode(body)
                .Split('&')
                .Select(p => p.Split('='))
                .Where(p => p.Length == 2)
                .ToDictionary(
                    p => p[0],
                    p => p[1],
                    StringComparer.InvariantCultureIgnoreCase);

        public override string ToString()
        {
            return $"{Method} {Path}";
        }
    }
}
