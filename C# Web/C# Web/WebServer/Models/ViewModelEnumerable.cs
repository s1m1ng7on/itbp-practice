using System.Collections;

namespace WebServer.Models
{
    public class ViewModelEnumerable<T> : IViewModel, IEnumerable<T> where T : IViewModel
    {
        private readonly List<T> items;

        public ViewModelEnumerable()
            => items = new List<T>();

        public void Add(T item)
            => items.Add(item);

        public IEnumerator<T> GetEnumerator()
            => items.GetEnumerator();

        IEnumerator IEnumerable.GetEnumerator()
            => GetEnumerator();
    }
}