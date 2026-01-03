namespace reading_list_manager_api.Models
{
    public class Book
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Author { get; set; } = null!;

        public string Genre { get; set; } = null!;

        public int PublishedYear { get; set; }

        public ICollection<ReadingList> ReadingLists { get; set; } = new List<ReadingList>();
    }

}
