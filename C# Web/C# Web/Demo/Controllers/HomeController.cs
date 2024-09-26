using WebServer.Controllers;
using WebServer.Http;
using System.Text;
using System.Web;
using Demo.Models;

namespace Demo.Controllers
{
    public class HomeController : Controller
    {
        public HomeController(Request request) : base(request) { }

        public Response Index() => Text("Hello from the server!");
        public Response Home() => Text("Home sweet home");
        public Response About() => View();
        public Response Form() => View();
        public Response Download() => View();
        public Response GoToYoutube() => Redirect("https://youtube.com");
        public Response GoToDeltaForce() => Redirect("https://www.youtube.com/watch?v=JwVqgS9QXYg");

        public Response FormPost()
        {
            string name = Request.Form["Name"];
            int age = int.Parse(Request.Form["Age"]);

            FormViewModel formViewModel = new FormViewModel()
            {
                Name = name,
                Age = age,
            };

            return View(formViewModel);
        }

        public Response DownloadFormAction() => File("D:\\Projects\\ITBP Practice\\C# Web\\C# Web\\Demo\\Resources\\module27.html");

        public Response Cookies()
        {
            string body;
            bool requestHasCookies = Request.Cookies.Any(c => c.Name != WebServer.Http.Session.CookieName);

            body = requestHasCookies
                ? $"<h1>Cookies</h1>\n" +
                    $"{string.Join("<br>", Request.Cookies.Select(c => $"Cookie: {HttpUtility.HtmlEncode(c.Name)}={HttpUtility.HtmlEncode(c.Value)}"))}"
                : "<h1>Cookies set!</h1>";

            CookieCollection cookies = null;
            if (!requestHasCookies)
            {
                cookies = new CookieCollection
                {
                    { "My-Cookie", "My-Value" },
                    { "My-Second-Cookie", "My-Second-Value" }
                };
            }

            return Html(body, cookies);
        }

        public Response Session()
        {
            string body = Request.Session.ContainsKey(WebServer.Http.Session.CurrentDateKey)
                ? $"Stored date: {Request.Session[WebServer.Http.Session.CurrentDateKey]}!"
                : "Current date stored!";

            return Text(body);
        }
    }
}
