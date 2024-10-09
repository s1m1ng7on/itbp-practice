using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebServer.Http;

namespace WebServer.Attributes
{
    [AttributeUsage(AttributeTargets.Method)]
    public abstract class MethodAttribute : Attribute
    {
        public Method Method { get; }

        protected MethodAttribute(Method method)
            => Method = method;
    }
}
