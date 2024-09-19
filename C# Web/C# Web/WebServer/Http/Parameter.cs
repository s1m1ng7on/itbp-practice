using WebServer.Common;

namespace WebServer.Http
{
    public class Parameter
    {
        public string Name { get; set; }
        public string Value { get; set; }

        public Parameter(string name, string value)
        {
            Guard.AgainstNull(name, nameof(value));
            Guard.AgainstNull(value, nameof(value));

            Name = name;
            Value = value;
        }

        public override string ToString() => $"{Name}={Value}";
    }
}
