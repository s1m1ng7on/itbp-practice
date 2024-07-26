using WebServer.Common;

namespace WebServer.Http
{
    public class Header
    {
        public const string Cookie = "Cookie";
        public const string SetCookie = "Set-Cookie";

        public string Name { get; set; }
        public string Value { get; set; }

        public Header(string name, string value)
        {
            Guard.AgainstNull(name, nameof(value));
            Guard.AgainstNull(value, nameof(value));

            Name = name;
            Value = value;
        }

        public override string ToString()
        {
            return $"{Name}: {Value}";
        }
    }
}
