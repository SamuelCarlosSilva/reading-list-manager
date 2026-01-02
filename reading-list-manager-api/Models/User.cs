namespace reading_list_manager_api.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<ReadingList> ReadingLists { get; set; } = new List<ReadingList>();
    }
}
