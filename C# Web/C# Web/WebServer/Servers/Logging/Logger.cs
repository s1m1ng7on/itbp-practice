namespace WebServer.Servers.Logging
{
    public class Logger
    {
        public string FilePath { get; init; }

        public Logger(string fileName)
            => FilePath = $"{fileName}.log";

        public void ShortLog(Log log)
            => Console.WriteLine(log.Short);

        public void DetailedLog(Log log)
            => Console.WriteLine(log.Detailed);
    }
}
