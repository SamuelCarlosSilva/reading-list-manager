using reading_list_manager_api.Models;

public class ReadingListCreateDto
{
    public int UserId { get; set; }
    public int BookId { get; set; }
    public ReadingStatus Status { get; set; }
}
