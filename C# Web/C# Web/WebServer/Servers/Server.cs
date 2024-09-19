using System.Diagnostics;
using System.Net;
using System.Net.Sockets;
using System.Text;
using WebServer.Http;
using WebServer.Routing;

namespace WebServer.Servers
{
    public class Server
    {
        private readonly TcpListener serverListener;
        private readonly RoutingTable routingTable;

        public ServerInfo Info { get; init; }

        public Server(string name, string _ipAddress, int _port, Action<IRoutingTable> routingTableConfiguration)
        {
            Info = new ServerInfo(name, _ipAddress, _port, "1.0.0");
            serverListener = new TcpListener(IPAddress.Parse(Info.IPAddress), Info.Port);
            routingTableConfiguration(routingTable = new RoutingTable());
        }

        public Server(string name, int port, Action<IRoutingTable> routingTable) : this(name, "0.0.0.0", port, routingTable) { }

        public Server(string name, Action<IRoutingTable> routingTable) : this(name, 8080, routingTable) { }

        public virtual async Task Start()
        {
            serverListener.Start();

            Console.WriteLine($"{Info.Name} is listening on port {Info.Port}\n" +
                      $"Local access at: {Info.LocalAccessPoint}\n" +
                      "Listening for requests...\n");

            while (true)
            {
                TcpClient connection = await serverListener.AcceptTcpClientAsync();

                _ = Task.Run(async () =>
                {
                    NetworkStream stream = connection.GetStream();

                    string requestText = await ReadRequest(stream);

                    Request request = Request.Parse(requestText);

                    Response response = routingTable.MatchRequest(request);

                    response.Headers.Add("Server", $"{Info.Name} {Info.Version}");
                    response.Headers.Add("IP", $"{Info.IPAddress}:{Info.Port}");
                    response.Headers.Add("Uptime", Info.ServerUpTime.ToString());
                    response.Headers.Add("Environment", Info.OperatingSystem);
                    response.Headers.Add("Date", DateTime.Now.ToString());

                    if (response.PreRenderAction != null)
                        response.PreRenderAction(request, response);

                    AddSession(request, response);

                    await WriteResponse(stream, response);

                    string requestLog = GetLog(request, response);
                    Console.WriteLine(requestLog);

                    connection.Close();
                });
            }
        }

        private async Task<string> ReadRequest(NetworkStream stream)
        {
            StringBuilder request = new StringBuilder();

            byte[] buffer = new byte[1024];
            int totalBytes = 0;
            do
            {
                int bytesRead = await stream.ReadAsync(buffer, 0, buffer.Length);
                totalBytes += bytesRead;

                if (totalBytes >= 10 * 1024)
                    throw new InvalidOperationException("Request is too large");

                request.Append(Encoding.UTF8.GetString(buffer, 0, bytesRead));
            }
            while (stream.DataAvailable);

            return request.ToString();
        }


        private async Task WriteResponse(NetworkStream stream, Response response)
        {
            byte[] responseBytes = Encoding.UTF8.GetBytes(response.ToString());
            await stream.WriteAsync(responseBytes);
        }

        private static void AddSession(Request request, Response response)
        {
            if (!request.Session.ContainsKey(Session.CurrentDateKey))
            {
                request.Session[Session.CurrentDateKey] = DateTime.Now.ToString();
                response.Cookies.Add(Session.CookieName, request.Session.Id);
            }
        }

        private string GetLog(Request request, Response response)
        {
            string statusCodeColor = $"\u001b{(int)response.StatusCode switch
            {
                >= 100 and < 200 => "[34m",
                >= 200 and < 300 => "[32m",
                >= 300 and < 400 => "[94m",
                >= 400 and < 500 => "[31m",
                >= 500 and < 600 => "[33m",
                _ => "[0m"
            }}";

            return $"{request.Method} {Info.LocalAccessPoint}{request.Path} => {statusCodeColor}{(int)response.StatusCode} {response.StatusCode}\u001b[0m\n" +
                   ((int)response.StatusCode < 400 ? $"Headers: {response.Headers.Count}\n" : string.Empty) +
                   (!string.IsNullOrEmpty(response.Body) ? $"\u001b[90m{(response.Body.Length > 50 ? $"{response.Body.Substring(0, 50)}..." : response.Body)}\u001b[0m\n" : string.Empty);
        }
    }

    public class ServerInfo
    {
        public string Name { get; set; }
        public string IPAddress { get; private set; }
        public int Port { get; private set; }
        public DateTime StartTime { get; private set; }
        public string Version { get; private set; }
        public string OperatingSystem { get; private set; }
        public long Requests { get; private set; }

        public string LocalAccessPoint => $"http://localhost:{Port}";
        public TimeSpan ServerUpTime => DateTime.Now - StartTime;

        public ServerInfo(string name, string ipAddress, int port, string version)
        {
            Name = name;
            IPAddress = ipAddress;
            Port = port;
            StartTime = DateTime.Now;
            Version = version;
            OperatingSystem = Environment.OSVersion.ToString();
            Requests = 0;
        }
    }
}
