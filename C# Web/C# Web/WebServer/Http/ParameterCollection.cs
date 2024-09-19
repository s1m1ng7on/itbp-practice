using System.Collections;

namespace WebServer.Http
{
    public class ParameterCollection : IEnumerable<Parameter>
    {
        private readonly Dictionary<string, Parameter> parameters = new Dictionary<string, Parameter>();

        public string this[string name] => parameters[name].Value;

        public int Count => parameters.Count;

        public void Add(string name, string value) => parameters.Add(name, new Parameter(name, value));

        public bool Contains(string name) => parameters.ContainsKey(name);

        public override string ToString() => string.Join("\n", parameters.Values);

        public IEnumerator<Parameter> GetEnumerator() => parameters.Values.GetEnumerator();

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }
}
