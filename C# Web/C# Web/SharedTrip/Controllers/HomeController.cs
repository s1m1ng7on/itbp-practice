using WebServer.Attributes;
using WebServer.Controllers;
using WebServer.Http;
using WebServer.Models;

namespace SharedTrip.Controllers
{
    public class HomeController : Controller
    {
        public HomeController(Request request) : base(request) { }

        [GET] public Response Index() => View(new Person { Name = "Simeon", Age = 18 });
    }

    public class Person : IViewModel
    {
        public string Name { get; set; }
        public int Age { get; set; }
    }
}