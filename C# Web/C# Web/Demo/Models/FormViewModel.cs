using WebServer.Models;

namespace Demo.Models
{
    public class FormViewModel : ViewModel
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public Cat Cat { get; set; }
    }
}
