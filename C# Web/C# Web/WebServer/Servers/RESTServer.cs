using WebServer.Routing;

namespace WebServer.Servers
{
    public class RESTServer : Server
    {
        public RESTServer(string name, Action<IRoutingTable> routingTable) : base(name, routingTable) { }
        public RESTServer(string name, int port, Action<IRoutingTable> routingTable) : base(name, port, routingTable) { }
        public RESTServer(string name, string _ipAddress, int _port, Action<IRoutingTable> routingTableConfiguration) : base(name, _ipAddress, _port, routingTableConfiguration) { }
    }
}
