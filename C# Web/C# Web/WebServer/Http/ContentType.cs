namespace WebServer.Http
{
    public class ContentType
    {
        public const string PlainText = "text/plain; charset=UTF-8";
        public const string Html = "text/html; charset=UTF-8";
        public const string Css = "text/css";
        public const string Js = "application/javascript";
        public const string Json = "application/json";
        public const string Jpeg = "image/jpeg";
        public const string Png = "image/png";
        public const string FormUrlEncoded = "application/x-www-form-urlencoded";
        public const string File = $"application/octet-stream";

        public static string GetByFileExtension(string fileExtension)
            => fileExtension switch
            {
                "html" => Html,
                "css" => Css,
                "js" => Js,
                "json" => Json,
                "jpg" or "jpeg" => Jpeg,
                "png" => Png,
                _ => PlainText
            };
    }
}
