using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using reading_list_manager_api.Models;


namespace reading_list_manager_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserReadDto>>> GetUsers()
        {
            return await _context.Users
                .Select(u => new UserReadDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    Email = u.Email
                })
                .ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserReadDto>> GetUser(int id)
        {
            var user = await _context.Users
                .Where(u => u.Id == id)
                .Select(u => new UserReadDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    Email = u.Email
                })
                .FirstOrDefaultAsync();

            if (user == null)
                return NotFound();

            return user;
        }


        // GET: api/Users/ReadingList/5
        [HttpGet("ReadingList/{id}")]
        public async Task<ActionResult<UserWithReadingListsDto>> GetUserWithReadingLists(int id)
        {
            var user = await _context.Users
                .Where(u => u.Id == id)
                .Select(u => new UserWithReadingListsDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    Email = u.Email,
                    ReadingLists = u.ReadingLists.Select(r => new ReadingListUserDto
                    {
                        Id = r.Id,
                        BookId = r.BookId,
                        BookTitle = r.Book.Title,
                        Status = r.Status,
                        AddedAt = r.AddedAt
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (user == null)
                return NotFound();

            return user;
        }


        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<UserReadDto>> PostUser(UserCreateDto dto)
        {
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var result = new UserReadDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email
            };

            return CreatedAtAction(nameof(GetUser),
                new { id = result.Id }, result);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, UserUpdateDto dto)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound();

            user.Name = dto.Name;
            user.Email = dto.Email;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
