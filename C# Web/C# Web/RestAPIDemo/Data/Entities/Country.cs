using System.ComponentModel.DataAnnotations;

namespace RestAPIDemo.Data.Entities
{
    public class Country
    {
        [Key] public string? Code { get; set; }
        [Required] public string? Name { get; set; }
        [Required] public string? Capital { get; set; }
        [Required] public int Size { get; set; }
        [Required] public int Population { get; set; }

        public Country(string code, string name, string capital, int size, int population)
        {
            Code = code;
            Name = name;
            Capital = capital;
            Size = size;
            Population = population;
        }
    }
}
