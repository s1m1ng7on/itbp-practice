namespace Demo.Models
{
    public class Cat
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public Breed Breed { get; set; }
    }

    public class Breed
    {
        public string Name { get; set; }
        public string Color { get; set; }
    }
}
