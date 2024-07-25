using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebServer.Http;

namespace WebServer.Responses
{
    public class RedirectResponse : Response
    {
        public RedirectResponse(string location) : base(StatusCode.Found)
        {
            Headers.Add("Location", location);
        }
    }
}
