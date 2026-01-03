using reading_list_manager_api.Models;

public class ReadingListUserDto
{
    public int Id { get; set; }
    public int BookId { get; set; }
    public string BookTitle { get; set; } = string.Empty;
    public ReadingStatus Status { get; set; }
    public DateTime AddedAt { get; set; }
}
