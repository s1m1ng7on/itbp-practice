using WebServer.Controllers;
using WebServer.Http;

namespace Demo.Controllers
{
    public class UserController : Controller
    {
        public const string Username = "MyUsername";
        public const string Password = "MyPassword";

        public UserController(Request request) : base(request) { }

        public Response Login() => View();

        //TO FIX SESSION CLEAR
        public Response LoginAction()
        {
            Request.Session.Clear();

            bool areLoginCredentialsCorrect = Request.Form["Username"] == Username && Request.Form["Password"] == Password;

            if (areLoginCredentialsCorrect)
            {
                string body = "<h3>Logged in successfully!</h3>";
                Request.Session[Session.UserKey] = "MyUserId";

                CookieCollection cookies = new CookieCollection
                {
                    { Session.CookieName, Request.Session.Id }
                };

                return Html(body, cookies);
            }
            else
            {
                return Redirect("/login");
            }
        }

        public Response Logout()
        {
            Request.Session.Clear();
            return View();
        }

        public Response User()
        {
            string body = Request.Session.ContainsKey(Session.UserKey)
                ? $"<h3>Currently logged-in user is with username '{Username}'</h3>"
                : "<h3>You should first log in - <a href=\"/login\">Login</a></h3>";

            return Html(body);
        }
    }
}
