using Newtonsoft.Json;

namespace GetAsync
{
    public class Program
    {
        private const string apiKey = "6684095d";

        public static async Task Main(string[] args)
        {
            string query;
            while ((query = Console.ReadLine()).ToLower() != "end")
            {
                var movies = await GetMoviesAsync(query);
                Console.WriteLine(movies);
            }
        }

        public static async Task<MovieSearchResult> GetMoviesAsync(string query)
        {
            string uri = $"https://www.omdbapi.com/?apikey={apiKey}&s={query}";

            using (HttpClient client = new HttpClient())
            {
                using (HttpResponseMessage response = await client.GetAsync(uri))
                {
                    string result = await response.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<MovieSearchResult>(result);
                }
            }
        }
    }
}
