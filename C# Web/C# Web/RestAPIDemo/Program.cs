using RestAPIDemo.Controllers;
using WebServer.Servers;
using WebServer.Routing;

namespace RestAPIDemo
{
    internal class Program
    {
        static async Task Main(string[] args)
            => await new RESTServer("My REST Server", r => r
                .MapGet<CountryController>("/countries", c => c.All())
                .MapPost<CountryController>("/countries", c => c.AddCountryAction()))
            .Start();
    }
}
