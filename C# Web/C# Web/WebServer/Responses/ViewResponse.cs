using System.Reflection;
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

            if (viewModel != null)
                viewContent = PopulateModel(viewContent, viewModel);

            Body = viewContent;
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
    }
}
