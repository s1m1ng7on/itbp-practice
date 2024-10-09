using System.Collections;
using System.Reflection.Metadata.Ecma335;
using WebServer.Models;

namespace WebServer.Responses
{
    public class ViewResponse : HtmlResponse
    {
        private const char PathSeparator = '/';

        public ViewResponse(string viewName, string controllerName, IViewModel viewModel = null) : base(string.Empty)
        {
            if (!viewName.Contains(PathSeparator))
                viewName = controllerName + PathSeparator + viewName;

            string viewPath = Path.GetFullPath($"./Views/{viewName.TrimStart(PathSeparator)}.cshtml");
            string viewContent = File.ReadAllText(viewPath);
            var (layoutPath, layoutExists) = FindLayout();

            if (layoutExists)
            {
                string layoutContent = File.ReadAllText(layoutPath);

                viewContent = layoutContent
                    .Replace("{{Title}}", "Title")
                    .Replace("{{RenderBody}}", viewContent);
            }

            if (viewModel != null)
            {
                viewContent = PopulateModel(viewContent, viewModel);

                if (viewModel is IViewModel)
                    viewContent = PopulateEnumerableModel(viewContent, viewModel);
            }

            Body = viewContent;
        }

        private (string, bool) FindLayout()
        {
            string layoutPath = Path.GetFullPath("./Views/Layout.cshtml");
            bool layoutExists = false;

            if (File.Exists(layoutPath))
            {
                layoutExists = true;
            }
            else
            {
                layoutPath = Path.GetFullPath("./Views/Shared/_Layout.cshtml");

                if (File.Exists(layoutPath))
                    layoutExists = true;
            }

            return (layoutPath, layoutExists);
        }

        private string PopulateModel(string viewContent, IViewModel viewModel)
        {
            var viewModelProperties = viewModel
                .GetType()
                .GetProperties()
                .Select(p => new
                {
                    p.Name,
                    Value = p.GetValue(viewModel),
                });

            foreach (var property in viewModelProperties)
            {
                const string openingBrackets = "{{";
                const string closingBrackets = "}}";

                viewContent = viewContent.Replace($"{openingBrackets}{property.Name}{closingBrackets}", property.Value.ToString());
            }

            return viewContent;
        }

        private string PopulateEnumerableModel(string viewContent, IViewModel viewModels)
        {
            List<string> lines = viewContent.Split('\n').Select(l => l.Trim()).ToList();

            bool inLoop = false;
            string loopTemplate = string.Empty;
            string result = string.Empty;

            foreach (string line in lines)
            {
                if (line.StartsWith("{{foreach}}"))
                {
                    inLoop = true;
                    continue;
                }

                if (inLoop)
                {
                    if (line.StartsWith("{"))
                    {
                        continue;
                    }
                    else if (line.StartsWith("}"))
                    {
                        inLoop = false;

                        foreach (var viewModel in viewModels)
                            result += PopulateModel(loopTemplate, viewModel);

                        continue;
                    }
                    else
                    {
                        loopTemplate += line;
                    }
                }
            }

            viewContent.Replace(loopTemplate, result);
            return viewContent;
        }
    }
}
