using Microsoft.CodeAnalysis.Scripting;

namespace WebServer.Views
{
    public class View
    {
        public string Raw { get; init; }
        public Dictionary<string, Script<object>> ScriptCache { get; init; }

        public View(string content)
        {
            Raw = content;
            ScriptCache = this.CompileScripts();
        }
    }
}
