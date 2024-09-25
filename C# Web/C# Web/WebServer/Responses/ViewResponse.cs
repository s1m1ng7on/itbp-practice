using WebServer.Http;

namespace WebServer.Responses
{
    public class ViewResponse : ContentResponse
    {
        private const string PathSeparator = "/";

        public ViewResponse(string viewName, string controllerName) : base(string.Empty, ContentType.Html)
        {
            if (!viewName.Contains(PathSeparator))
                viewName = controllerName + PathSeparator + viewName;

            string viewPath = Pat
        }
    }
}
