using WebServer.Common;

namespace WebServer.Http
{
    public class Cookie
    {
        public string Name { get; set; }
        public string Value { get; set; }

        public Cookie(string name, string value)
        {
            Guard.AgainstNull(name, nameof(name));
            Guard.AgainstNull(value, nameof(value));

            Name = name;
            Value = value;
        }

        public override string ToString() => $"{Name}={Value}";
    }
}
