using WebServer.Responses;
using WebServer.Resources;
using WebServer.Http;
using System.Web;

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
                .MapGet("/youtube", new RedirectResponse("https://youtube.com/"))
                .MapGet("/cookies", new HtmlResponse("", AddCookieAction)))
            .Start();

        private static void AddCookieAction(Request request, Response response)
        {
            string result;

            if (request.Cookies.Any())
            {
                result = $"<h1>Cookies</h1>\n" +
                    $"{string.Join("<br>", request.Cookies.Select(c => $"Cookie: {HttpUtility.HtmlEncode(c.Name)}={HttpUtility.HtmlEncode(c.Value)}"))}";
            }
            else
            {
                result = "<h1>Cookies set!</h1>";
                response.Cookies.Add("My-Cookie", "Secret Value");
                response.Cookies.Add("My-Cookie2", "More Secret Value");
            }

            response.Body = result;
        }
    }
}
