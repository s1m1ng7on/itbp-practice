using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebServer.Http;

namespace WebServer.Responses
{
    public class NotFoundResponse : Response
    {
        public NotFoundResponse() : base(StatusCode.NotFound) { }
    }
}
