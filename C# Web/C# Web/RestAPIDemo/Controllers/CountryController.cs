using WebServer.Http;
using WebServer.Controllers;
using RestAPIDemo.Data;
using RestAPIDemo.Data.Entities;

namespace RestAPIDemo.Controllers
{
    public class CountryController : Controller
    {
        private Context dbContext;

        public CountryController(Request request) : base(request)
            => dbContext = new Context();

        public Response All()
        {
            if (Request.Parameters.Contains("c"))
                return Json(dbContext.Countries.FirstOrDefault(c => c.Code == Request.Parameters["c"]));

            if (Request.Parameters.Contains("n"))
                return Json(dbContext.Countries.FirstOrDefault(c => c.Name == Request.Parameters["n"]));

            return Json(dbContext.Countries.ToArray());
        }

        public Response AddCountryAction()
        {
            Country newCountry = new Country(Request.Form["Code"], Request.Form["Name"], Request.Form["Capital"], int.Parse(Request.Form["Size"]), int.Parse(Request.Form["Population"]));
            dbContext.Countries.Add(newCountry);
            dbContext.SaveChanges();

            return Json(newCountry);
        }
    }
}
