using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using simple_employee_backend.Data;

namespace simple_employee_backend.Controllers;

[ApiController]
[Route("jobs")]
public class OccupationController(ILogger<OccupationController> logger, DataContext db) : ControllerBase
{
    private readonly ILogger<OccupationController> _logger = logger;
    
    [HttpGet(Name = "GetPaginatedJobs")]
    public async Task<ActionResult<IEnumerable<Occupation>>> GetJobs(
        [FromQuery(Name = "_page")] int? page = null, 
        [FromQuery(Name = "_per_page")] int? pageSize = null)
    {
        try
        {
            if (!page.HasValue || !pageSize.HasValue)
            {
                var allJobs = await db.Jobs.ToListAsync();
                return Ok(allJobs);
            }
            var jobs = await db.Jobs
                .Skip((page.Value - 1) * pageSize.Value)
                .Take(pageSize.Value)
                .ToListAsync();

            return Ok(jobs);
        }
        catch (DbException ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpGet("{id}", Name = "GetOccupation")]
    public async Task<ActionResult<Occupation>> GetOccupation(int id)
    {
        try
        {
            var job = await db.Jobs.FindAsync(id);
            return job != null ? Ok(job) : NotFound();
        }
        catch (DbException e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e);
        }
    }

    [HttpPost(Name = "CreateOccupation")]
    public async Task<ActionResult<Occupation>> CreateOccupation(Occupation job)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        try
        {
            db.Jobs.Add(job);
            await db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetOccupation), new { id = job.Id }, job);
        }
        catch (DbUpdateException e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e);
        }
    }

    [HttpPut(Name = "UpdateOccupation")]
    public async Task<ActionResult<Occupation>> UpdateOccupation(Occupation job)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        try
        {
            var jobToUpdate = await db.Jobs.FindAsync(job.Id);
            if (jobToUpdate == null) return NotFound();
            db.Entry(jobToUpdate).CurrentValues.SetValues(job);
            await db.SaveChangesAsync();
            return NoContent();
        }
        catch (DbException e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e);
        }
    }

    [HttpDelete("{id}", Name = "DeleteOccupation")]
    public async Task<ActionResult<Occupation>> DeleteOccupation(int id)
    {
        try
        {
            var jobToDelete = await db.Jobs.FindAsync(id);
            if (jobToDelete == null) return NotFound();
            db.Jobs.Remove(jobToDelete);
            await db.SaveChangesAsync();
            return NoContent();
        }
        catch (DbException e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e);
        }
    }
}