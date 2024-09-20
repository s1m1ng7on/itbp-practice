using System.IO;
using WebServer.Http;

namespace WebServer.Responses
{
    public class FileResponse : Response
    {
        public string Path { get; init; }

        public FileResponse(string path) : base(StatusCode.OK)
        {
            Path = path;
            Headers.Add(Header.ContentType, ContentType.File);
        }

        public override string ToString()
        {
            if (File.Exists(Path))
            {
                Body = string.Empty;
                FileContent = File.ReadAllBytes(Path);

                FileInfo fileInfo = new FileInfo(Path);

                Headers.Add(Header.ContentLength, fileInfo.Length.ToString());
                Headers.Add(Header.ContentDisposition, $"attachment; filename=\"{fileInfo.Name}\"");
            }

            return base.ToString();
        }
    }
}