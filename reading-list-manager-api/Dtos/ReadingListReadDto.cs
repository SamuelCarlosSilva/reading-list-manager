using reading_list_manager_api.Models;

public class ReadingListReadDto
{
    public int Id { get; set; }

    public int UserId { get; set; }
    public string UserName { get; set; } = string.Empty;

    public int BookId { get; set; }
    public string BookTitle { get; set; } = string.Empty;

    public ReadingStatus Status { get; set; }
    public DateTime AddedAt { get; set; }
}
