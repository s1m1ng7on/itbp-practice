using System.Text.RegularExpressions;
using Microsoft.CodeAnalysis.CSharp.Scripting;
using Microsoft.CodeAnalysis.Scripting;

namespace WebServer.Views
{
    public static class ViewExtension
    {
        private static readonly ScriptOptions scriptOptions = ScriptOptions.Default
            .AddReferences(
                typeof(object).Assembly,                      
                typeof(System.Linq.Enumerable).Assembly,      
                typeof(DateTime).Assembly,                    
                typeof(System.Collections.Generic.List<>).Assembly,
                typeof(System.Threading.Tasks.Task).Assembly, 
                typeof(System.Reflection.Assembly).Assembly   
            )
            .AddImports(
                "System",
                "System.Linq",
                "System.Collections.Generic",
                "System.Threading.Tasks",
                "System.Reflection"
            );

        public static string PopulateModel(this string viewContent, object model, List<string> parentModelNames = null)
        {
            var modelProperties = model
                .GetType()
                .GetProperties()
                .Select(p => new
                {
                    p.Name,
                    p.PropertyType,
                    Value = p.GetValue(model),
                });

            foreach (var property in modelProperties)
            {
                if (property.PropertyType.IsClass && property.PropertyType != typeof(string))
                {
                    if (parentModelNames == null)
                        parentModelNames = new List<string>();

                    parentModelNames.Add(property.Name);

                    viewContent = viewContent.PopulateModel(property.Value, parentModelNames);
                }

                const string openingBrackets = "{{";
                const string closingBrackets = "}}";

                string propertyFullName = $"{(parentModelNames != null ? string.Join(".", parentModelNames) + "." : string.Empty)}{property.Name}";
                viewContent = viewContent.Replace($"{openingBrackets}{propertyFullName}{closingBrackets}", property.Value?.ToString());
            }

            return viewContent;
        }

        //TO READ FROM VIEW MODEL PROPERTIES
        public static string PopulateView(this View view, object model = null)
        {
            string viewContent = view.Raw;
            string pattern = @"\{\{(.*?)\}\}";

            MatchCollection matches = Regex.Matches(viewContent, pattern);
            
            foreach (Match match in matches)
            {
                string codeSnippet = match.Groups[1].Value;

                if (!view.ScriptCache.TryGetValue(codeSnippet, out var compiledScript))
                    compiledScript = view.ScriptCache[codeSnippet];

                object result = compiledScript.RunAsync().Result.ReturnValue;

                viewContent = viewContent.Replace(match.Value, result.ToString());
            }

            return viewContent;
        }

        public static Dictionary<string, Script<object>> CompileScripts(this View view)
        {
            Dictionary<string, Script<object>> scripts = new Dictionary<string, Script<object>>();

            string pattern = @"\{\{(.*?)\}\}";
            MatchCollection matches = Regex.Matches(view.Raw, pattern);

            foreach (Match match in matches)
            {
                string codeSnippet = match.Groups[1].Value;

                if (!scripts.TryGetValue(codeSnippet, out var compiledScript))
                {
                    compiledScript = CSharpScript.Create(codeSnippet, scriptOptions);
                    scripts[codeSnippet] = compiledScript;
                }
            }

            return scripts;
        }
    }
}