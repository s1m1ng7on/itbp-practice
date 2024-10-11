using System.Collections;

namespace WebServer.Views
{
    public class ViewCollection : IEnumerable<View>
    {
        private const string Shared = "Shared";

        private readonly Dictionary<string, Dictionary<string, View>> views = new Dictionary<string, Dictionary<string, View>>();

        public static ViewCollection LoadViews(string folderName = "Views")
        {
            ViewCollection views = new ViewCollection();

            string currentDirectory = Directory.GetCurrentDirectory();
            string viewsFolder = Path.Combine(currentDirectory, folderName);

            if (!Directory.Exists(viewsFolder))
                return null;

            string[] viewFiles = Directory.GetFiles(viewsFolder, "*.*", SearchOption.AllDirectories);

            foreach (string file in viewFiles)
            {
                string relativePath = Path.GetRelativePath(viewsFolder, file);

                string[] viewNameArr = relativePath.Split('\\');
                string controllerName = viewNameArr.Length > 1 ? viewNameArr[0] : Shared;
                string viewName = viewNameArr.Last().Replace(".cshtml", string.Empty);

                string viewPath = $"{viewsFolder}\\{relativePath}";
                string viewContent = File.ReadAllText(viewPath);

                View view = new View(viewContent);

                views.Add(controllerName, viewName, view);
            }

            return views;
        }

        public View this[string controllerName, string viewName] => views[controllerName][viewName];

        public int Count => views.Sum(c => c.Value.Count);

        public void Add(string controllerName, string viewName, View view)
        {
            if (!views.ContainsKey(controllerName))
                views[controllerName] = new Dictionary<string, View>();

            views[controllerName][viewName] = view;
        }

        public bool Contains(View view) => views.Values.Any(v => v.ContainsValue(view));

        public IEnumerator<View> GetEnumerator() => views.Values.SelectMany(v => v.Values).GetEnumerator();

        IEnumerator IEnumerable.GetEnumerator() => views.Values.GetEnumerator();
    }
}
