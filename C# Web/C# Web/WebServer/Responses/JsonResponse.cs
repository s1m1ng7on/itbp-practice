using Newtonsoft.Json;
using WebServer.Http;

namespace WebServer.Responses
{
    public class JsonResponse : ContentResponse
    {
        public JsonResponse(object[] data, Action<Request, Response> preRenderAction = null) : base(JsonConvert.SerializeObject(data, Formatting.Indented), ContentType.Json, preRenderAction) { }
    }
}
