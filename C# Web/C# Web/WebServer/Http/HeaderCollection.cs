namespace WebServer.Http
{
    public class HeaderCollection
    {
        private readonly Dictionary<string, Header> headers = new Dictionary<string, Header>();

        public int Count => headers.Count;

        public void Add(string name, string value)
        {
            headers.Add(name, new Header(name, value));
        }

        public override string ToString()
        {
            return string.Join("\n", headers.Values);
        }
    }
}
