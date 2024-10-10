namespace WebServer.Views
{
    public static class ViewExtension
    {
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
    }
}