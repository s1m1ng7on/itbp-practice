using WebServer.Controllers;
using WebServer.Http;
using System.Text;
using System.Web;
using Demo.Models;
using WebServer.Attributes;
using WebServer.Models;

namespace Demo.Controllers
{
    public class HomeController : Controller
    {
        public HomeController(Request request) : base(request) { }

        [GET] public Response Index() => Text("Hello from the server!");
        [GET] public Response Student(string name, int age) => Text($"I'm {name} and I'm {age} years old!");
        [GET] public Response Home() => Text("Home sweet home");
        [GET] public Response About() => View();
        [GET] public Response Form() => View();
        [GET] public Response Download() => View();

        [GET] public Response Test()
            => View(new ViewModelEnumerable<FormViewModel>
            {
                new() { Name = "Simeon", Age = 18 },
                new() { Name = "Galina", Age = 3 },
                new() { Name = "Duda", Age = 5 }
            });

        [GET] public Response Youtube() => Redirect("https://youtube.com");
        [GET] public Response DeltaForce() => Redirect("https://www.youtube.com/watch?v=JwVqgS9QXYg");

        [POST]
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

        [POST] public Response DownloadFormAction() => File("D:\\Projects\\ITBP Practice\\C# Web\\C# Web\\Demo\\Resources\\module27.html");

        [GET]
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

        [GET]
        public Response Session()
        {
            string body = Request.Session.ContainsKey(WebServer.Http.Session.CurrentDateKey)
                ? $"Stored date: {Request.Session[WebServer.Http.Session.CurrentDateKey]}!"
                : "Current date stored!";

            return Text(body);
        }
    }
}
