using System.Net;
using System.Net.Sockets;
using System.Reflection.PortableExecutable;
using System.Text;
using WebServer.Http;
using WebServer.Routing;

namespace WebServer
{
    public class Server
    {
        private readonly TcpListener serverListener;
        private readonly RoutingTable routingTable;

        public ServerInfo Info { get; private set; }

        public Server(string name, string _ipAddress, int _port, Action<IRoutingTable> routingTableConfiguration)
        {
            Info = new ServerInfo(name, _ipAddress, _port, "1.0.0");

            serverListener = new TcpListener(IPAddress.Parse(Info.IPAddress), Info.Port);

            routingTableConfiguration(routingTable = new RoutingTable());
        }

        public Server(string name, int port, Action<IRoutingTable> routingTable) : this(name, "127.0.0.1", port, routingTable) { }

        public Server(string name, Action<IRoutingTable> routingTable) : this(name, 8080, routingTable) { }

        public async Task Start()
        {
            serverListener.Start();

            Console.WriteLine($"{Info.Name} is listening on port {Info.Port}");
            Console.WriteLine("Listening for requests...");

            while (true)
            {
                TcpClient connection = await serverListener.AcceptTcpClientAsync();

                _ = Task.Run(async () =>
                {
                    NetworkStream stream = connection.GetStream();

                    string requestText = await ReadRequest(stream);
                    Console.WriteLine(requestText);

                    Request request = Request.Parse(requestText);

                    Response response = routingTable.MatchRequest(request);

                    response.Headers.Add("Server", $"{Info.Name} {Info.Version}");
                    response.Headers.Add("IP", $"{Info.IPAddress}:{Info.Port}");
                    response.Headers.Add("Uptime", Info.ServerUpTime.ToString());
                    response.Headers.Add("Environment", Info.OperatingSystem);
                    response.Headers.Add("Date", DateTime.Now.ToString());

                    if (response.PreRenderAction != null)
                        response.PreRenderAction(request, response);

                    string responseString = response.ToString();
                    Console.WriteLine(responseString);

                    await WriteResponse(stream, response);

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
