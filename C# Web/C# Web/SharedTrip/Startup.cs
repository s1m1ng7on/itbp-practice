using System.Threading.Tasks;
using WebServer.Routing;

namespace WebServer
{
    public class Startup
    {
        public static async Task Main() =>
            await new Servers.WebServer("SharedTrip", r => r
                .MapControllers()
                .MapStaticFiles()
            ).Start();
    }
}
