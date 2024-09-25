using Demo.Controllers;
using System.Web;
using WebServer.Http;
using WebServer.Resources;
using WebServer.Routing;

namespace WebServer
{
    public class Startup
    {
        public static async Task Main() =>
            await new Servers.WebServer("MyServer", r => r
                .MapGet<HomeController>("/", c => c.Index())
                .MapGet<HomeController>("/home", c => c.Home())
                .MapGet<HomeController>("/about", c => c.About())
                .MapGet<HomeController>("/form", c => c.Form())
                .MapPost<HomeController>("/form", c => c.FormPost())
                .MapGet<HomeController>("/download", c => c.Download())
                .MapPost<HomeController>("/download", c => c.DownloadFormAction())
                .MapGet<HomeController>("/youtube", c => c.GoToYoutube())
                .MapGet<HomeController>("/deltaforce", c => c.GoToDeltaForce())
                .MapGet<HomeController>("/cookies", c => c.Cookies())
                .MapGet<HomeController>("/session", c => c.Session())
                .MapGet<UserController>("/login", c => c.Login())
                .MapPost<UserController>("/login", c => c.LoginAction())
                .MapGet<UserController>("/logout", c => c.Logout())
                .MapGet<UserController>("/user", c => c.User())
            ).Start();
    }
}
