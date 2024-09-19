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
            ).Start();
                /*.Map(Method.GET, "/cookies", new HtmlResponse("", AddCookiesAction))
                .Map(Method.GET, "/session", new HtmlResponse("", DisplaySessionInfoAction))
                .Map(Method.GET, "/login", new HtmlResponse(Pages.LoginForm))
                .Map(Method.POST, "/login", new HtmlResponse("", LoginAction))
                .Map(Method.GET, "/logout", new HtmlResponse("", LogoutAction))
                .Map(Method.GET, "/user", new HtmlResponse("", GetUserDataAction)));*/

        private static void AddCookiesAction(Request request, Response response)
        {
            string result;

            if (request.Cookies.Any(c => c.Name != Session.CookieName))
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

        private static void DisplaySessionInfoAction(Request request, Response response)
        {
            string result;

            if (request.Session.ContainsKey(Session.CurrentDateKey))
                result = $"Stored date: {request.Session[Session.CurrentDateKey]}!";
            else
                result = "Current date stored!";

            response.Body = result;
        }

        private static void LoginAction(Request request, Response response)
        {
            request.Session.Clear();

            string result;

            if (request.Form["Username"] == "s1m1ng7on" && request.Form["Password"] == "simganev10SIM")
            {
                request.Session[Session.UserKey] = "MyUserId";
                response.Cookies.Add(Session.CookieName, request.Session.Id);

                result = "<h3>Logged in successfully!</h3>";
            }
            else
                result = Pages.LoginForm;

            response.Body = result;
        }

        private static void LogoutAction(Request request, Response response)
        {
            request.Session.Clear();

            response.Body = "<h3>Logged out successfully!</h3>";
        }

        private static void GetUserDataAction(Request request, Response response)
        {
            string result;

            if (request.Session.ContainsKey(Session.UserKey))
                result = "<h3>Currently logged-in user is with username 's1m1ng7on'</h3>";
            else
                result = "<h3>You should first log in - <a href=\"/Login\">Login</a></h3>";
            
            response.Body = result;
        }
    }
}
