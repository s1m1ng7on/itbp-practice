using WebServer.Controllers;
using WebServer.Http;
using Demo.Resources;
using System.Text;

namespace Demo.Controllers
{
    public class HomeController : Controller
    {
        public HomeController(Request request) : base(request) { }

        public Response Index() => Text("Hello from the server!");
        public Response Home() => Text("Home sweet home");
        public Response About() => Html("<h1>ABOUT US</h1>What about us???");
        public Response Form() => Html(Pages.Form);
        public Response Download() => Html(Pages.DownloadForm);
        public Response GoToYoutube() => Redirect("https://youtube.com");
        public Response GoToDeltaForce() => Redirect("https://www.youtube.com/watch?v=JwVqgS9QXYg");

        public Response FormPost()
        {
            StringBuilder formData = new StringBuilder();

            foreach (var (key, value) in Request.Form)
                formData.AppendLine($"{key} - {value}");

            return Text(formData.ToString());
        }

        public Response DownloadFormAction() => File("D:\\Projects\\ITBP Practice\\C# Web\\C# Web\\Demo\\Resources\\module27.html");

        /*public Response Cookies()
        {
            Response response = new Response();

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
        });*/
    }
}
