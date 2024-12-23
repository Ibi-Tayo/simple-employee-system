using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using simple_employee_backend.Data;

namespace simple_employee_backend.Controllers;

[ApiController]
[Route("companies")]
public class CompanyController(ILogger<CompanyController> logger, DataContext db) : ControllerBase
{
    private readonly ILogger<CompanyController> _logger = logger;
    
    [HttpGet(Name = "GetPaginatedCompanies")]
    public async Task<ActionResult<IEnumerable<Company>>> GetCompanies(
        [FromQuery(Name = "_page")] int? page = null, 
        [FromQuery(Name = "_per_page")] int? pageSize = null)
    {
        try
        {
            if (!page.HasValue || !pageSize.HasValue)
            {
                var allCompanies = await db.Companies.ToListAsync();
                return Ok(allCompanies);
            }
            var companies = await db.Companies
                .Skip((page.Value - 1) * pageSize.Value)
                .Take(pageSize.Value)
                .ToListAsync();

            return Ok(companies);
        }
        catch (DbException ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpGet("{id}", Name = "GetCompany")]
    public async Task<ActionResult<Company>> GetCompany(int id)
    {
        try
        {
            var company = await db.Companies.FindAsync(id);
            return company != null ? Ok(company) : NotFound();
        }
        catch (DbException e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e);
        }
    }

    [HttpPost(Name = "CreateCompany")]
    public async Task<ActionResult<Company>> CreateCompany(Company company)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        try
        {
            db.Companies.Add(company);
            await db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCompany), new { id = company.Id }, company);
        }
        catch (DbUpdateException e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e);
        }
    }

    [HttpPut(Name = "UpdateCompany")]
    public async Task<ActionResult<Company>> UpdateCompany(Company company)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        try
        {
            var companyToUpdate = await db.Companies.FindAsync(company.Id);
            if (companyToUpdate == null) return NotFound();
            db.Entry(companyToUpdate).CurrentValues.SetValues(company);
            await db.SaveChangesAsync();
            return NoContent();
        }
        catch (DbException e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e);
        }
    }

    [HttpDelete("{id}", Name = "DeleteCompany")]
    public async Task<ActionResult<Company>> DeleteCompany(int id)
    {
        try
        {
            var companyToDelete = await db.Companies.FindAsync(id);
            if (companyToDelete == null) return NotFound();
            db.Companies.Remove(companyToDelete);
            await db.SaveChangesAsync();
            return NoContent();
        }
        catch (DbException e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e);
        }
    }
}