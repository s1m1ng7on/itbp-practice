using WebServer.Attributes;
using WebServer.Controllers;
using WebServer.Http;

namespace Demo.Controllers
{
    public class UserController : Controller
    {
        public const string Username = "MyUsername";
        public const string Password = "MyPassword";

        public UserController(Request request) : base(request) { }

        [GET] [Authorize] public Response Index() => Html($"<h3>Currently logged-in user is with username '{Username}'</h3>");
        [GET] public Response Login() => View();

        //TO FIX SESSION CLEAR
        [POST]
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

        [GET]
        public Response Logout()
        {
            Request.Session.Clear();
            return View();
        }
    }
}
