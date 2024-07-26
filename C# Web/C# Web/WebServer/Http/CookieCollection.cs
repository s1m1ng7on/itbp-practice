using System.Collections;

namespace WebServer.Http
{
    public class CookieCollection : IEnumerable<Cookie>
    {
        private readonly Dictionary<string, Cookie> cookies = new Dictionary<string, Cookie>();

        public string this[string name] => cookies[name].Value;

        public int Count => cookies.Count;

        public void Add(string name, string value) => cookies.Add(name, new Cookie(name, value));

        public bool Contains(string name) => cookies.ContainsKey(name);

        public IEnumerator<Cookie> GetEnumerator() => cookies.Values.GetEnumerator();

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public override string ToString() => 
            string.Join("\n", this.Select(c => new Header(Header.SetCookie, c.ToString())));
    }
}
