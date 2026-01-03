using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using reading_list_manager_api.Models;

namespace reading_list_manager_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReadingListsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReadingListsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ReadingLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReadingListReadDto>>> GetReadingLists()
        {
            return await _context.ReadingLists
                .Include(r => r.User)
                .Include(r => r.Book)
                .Select(r => new ReadingListReadDto
                {
                    Id = r.Id,
                    UserId = r.UserId,
                    UserName = r.User.Name,
                    BookId = r.BookId,
                    BookTitle = r.Book.Title,
                    Status = r.Status,
                    AddedAt = r.AddedAt
                })
                .ToListAsync();
        }


        // GET: api/ReadingLists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReadingListReadDto>> GetReadingList(int id)
        {
            var readingList = await _context.ReadingLists
                .Include(r => r.User)
                .Include(r => r.Book)
                .Where(r => r.Id == id)
                .Select(r => new ReadingListReadDto
                {
                    Id = r.Id,
                    UserId = r.UserId,
                    UserName = r.User.Name,
                    BookId = r.BookId,
                    BookTitle = r.Book.Title,
                    Status = r.Status,
                    AddedAt = r.AddedAt
                })
                .FirstOrDefaultAsync();

            if (readingList == null)
                return NotFound();

            return readingList;
        }


        // PUT: api/ReadingLists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReadingList(
    int id,
    ReadingListUpdateDto dto)
        {
            var entity = await _context.ReadingLists.FindAsync(id);

            if (entity == null)
                return NotFound();

            entity.Status = dto.Status;

            await _context.SaveChangesAsync();

            return NoContent();
        }


        // POST: api/ReadingLists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ReadingListReadDto>> PostReadingList(
            ReadingListCreateDto dto)
        {
            var entity = new ReadingList
            {
                UserId = dto.UserId,
                BookId = dto.BookId,
                Status = dto.Status
            };

            _context.ReadingLists.Add(entity);
            await _context.SaveChangesAsync();

            var result = await _context.ReadingLists
                .Include(r => r.User)
                .Include(r => r.Book)
                .Where(r => r.Id == entity.Id)
                .Select(r => new ReadingListReadDto
                {
                    Id = r.Id,
                    UserId = r.UserId,
                    UserName = r.User.Name,
                    BookId = r.BookId,
                    BookTitle = r.Book.Title,
                    Status = r.Status,
                    AddedAt = r.AddedAt
                })
                .FirstAsync();

            return CreatedAtAction(nameof(GetReadingList),
                new { id = result.Id }, result);
        }


        // DELETE: api/ReadingLists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReadingList(int id)
        {
            var readingList = await _context.ReadingLists.FindAsync(id);
            if (readingList == null)
            {
                return NotFound();
            }

            _context.ReadingLists.Remove(readingList);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReadingListExists(int id)
        {
            return _context.ReadingLists.Any(e => e.Id == id);
        }
    }
}
