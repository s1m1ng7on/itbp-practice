using System.Diagnostics;
using WebServer.Routing;

namespace WebServer.Servers
{
    public class WebServer : Server
    {
        public WebServer(string name, Action<IRoutingTable> routingTable) : base(name, routingTable) { }
        public WebServer(string name, int port, Action<IRoutingTable> routingTable) : base(name, port, routingTable) { }
        public WebServer(string name, string _ipAddress, int _port, Action<IRoutingTable> routingTableConfiguration) : base(name, _ipAddress, _port, routingTableConfiguration) { }

        public override async Task Start()
        {
            Process.Start(new ProcessStartInfo
            {
                FileName = Info.LocalAccessPoint,
                UseShellExecute = true,
            });

            await base.Start();
        }
    }
}
