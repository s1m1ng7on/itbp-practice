using WebServer.Routing;

namespace WebServer
{
    public class Startup
    {
        public static async Task Main() =>
            await new Servers.WebServer("MyServer", r => r
                .MapControllers()
                .MapStaticFiles()
            ).Start();
    }
}
