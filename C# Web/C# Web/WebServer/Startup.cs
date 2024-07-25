using WebServer.Responses;
using WebServer.Resources;

namespace WebServer
{
    public class Startup
    {
        public static async Task Main() => await new Server("MyServer", r => r
                .MapGet("/", new TextResponse("Hello from the server!"))
                .MapGet("/home", new TextResponse("Home sweet home!"))
                .MapGet("/about", new HtmlResponse("<h1>ABOUT US</h1><h2>What about us???</h2>"))
                .MapGet("/softuni", new RedirectResponse("https://softuni.bg/"))
                .MapGet("/parallax", new HtmlResponse(Pages.Parallax))
                .MapGet("/youtube", new RedirectResponse("https://youtube.com/")))
            .Start();
    }
}
