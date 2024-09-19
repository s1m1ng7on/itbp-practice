using System.Collections;

namespace WebServer.Http
{
    public class HeaderCollection : IEnumerable<Header>
    {
        private readonly Dictionary<string, Header> headers = new Dictionary<string, Header>();

        public string this[string name] => headers[name].Value;

        public int Count => headers.Count;

        public void Add(string name, string value) => headers.Add(name, new Header(name, value));

        public bool Contains(string name) => headers.ContainsKey(name);

        public override string ToString() => string.Join("\n", headers.Values);

        public IEnumerator<Header> GetEnumerator() => headers.Values.GetEnumerator();

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }
}
