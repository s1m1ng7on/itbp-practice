using WebServer.Http;

namespace WebServer.Responses
{
    public class FileResponse : TextResponse
    {
        public string FileName { get; init; }

        public FileResponse(string fileName) : base($"Downloading file \"{fileName}\"...")
        {
            FileName = fileName;
        }
    }
}
