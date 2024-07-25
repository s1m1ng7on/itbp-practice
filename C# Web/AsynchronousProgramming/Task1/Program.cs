namespace Task1
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Thread thread = new Thread(() => PrintEvenNumbers(1, 50));
            thread.Start();

            thread.Join();
            Console.WriteLine("Thread finished work");
        }

        public static void PrintEvenNumbers(int start, int finish)
        {
            for (int i = start; i <= finish; i++)
            {
                if (i % 2 == 0)
                    Console.WriteLine(i);
            }
        }
    }
}
