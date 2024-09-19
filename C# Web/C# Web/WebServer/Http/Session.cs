using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebServer.Common;

namespace WebServer.Http
{
    public class Session
    {
        public const string CookieName = "SessionId";
        public const string CurrentDateKey = "CurrentDate";
        public const string UserKey = "AuthenticatedUserId";

        private Dictionary<string, string> data;

        public string Id { get; init; }

        public string this[string key]
        {
            get => data[key];
            set => data[key] = value;
        }

        public Session(string id)
        {
            Guard.AgainstNull(id, nameof(id));

            Id = id;
            data = new Dictionary<string, string>();
        }

        public bool ContainsKey(string key) => data.ContainsKey(key);

        public void Clear() => data.Clear();
    }
}
