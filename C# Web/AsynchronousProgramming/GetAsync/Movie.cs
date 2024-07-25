using Newtonsoft.Json;

namespace GetAsync
{
    public class Movie
    {
        public string Title { get; set; }
        public string Year { get; set; }
        public string imdbID { get; set; }
        public string Type { get; set; }
        public string Poster { get; set; }

        public override string ToString()
        {
            return $"{Title} ({Year})";
        }
    }

    public class MovieSearchResult
    {
        public List<Movie> Search { get; set; }
        public string totalResults { get; set; }
        public string Response { get; set; }

        public override string ToString()
        {
            return string.Join("\n", Search.Select((m, i) => $"{i + 1}. {m}"));
        }
    }
}
