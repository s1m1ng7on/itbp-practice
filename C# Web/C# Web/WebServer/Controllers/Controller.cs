using WebServer.Http;
using WebServer.Responses;

namespace WebServer.Controllers
{
    public class Controller
    {
        protected Request Request { get; private init; }

        public Controller(Request request)
        {
            Request = request;
        }

        protected Response Text(string text) => new TextResponse(text);

        protected Response Html(string html, CookieCollection cookies = null)
        {
            Response response = new HtmlResponse(html);

            if (cookies?.Count > 0)
            {
                foreach (Cookie cookie in cookies)
                    response.Cookies.Add(cookie.Name, cookie.Value);
            }

            return response;
        }
        
        protected Response Json(object[] data) => new JsonResponse(data);
        protected Response Json(object data) => new JsonResponse([data]);
        protected Response Redirect(string url) => new RedirectResponse(url);
        protected Response File(string path) => new FileResponse(path);
        protected Response NotFound() => new NotFoundResponse();
    }
}
