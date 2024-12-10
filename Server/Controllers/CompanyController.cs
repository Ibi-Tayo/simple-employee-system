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

    [HttpGet(Name = "GetAllCompanies")]
    public ActionResult<IEnumerable<Company>> GetAllCompanies()
    {
        try
        {
            return Ok(db.Companies.ToList());
        }
        catch (DbException e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }

    [HttpGet(Name = "GetPaginatedCompanies")]
    public async Task<ActionResult<IEnumerable<Company>>> GetCompanies([FromQuery] int _page, [FromQuery] int _per_page)
    {
        try
        {
            var companies = await db.Companies
                .Skip((_page - 1) * _per_page)
                .Take(_per_page)
                .ToListAsync();

            return Ok(companies);
        }
        catch (DbException ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpGet("{id}", Name = "GetCompany")]
    public ActionResult<Company> GetCompany(int id)
    {
        try
        {
            var company = db.Companies.Find(id);
            return company != null ? Ok(company) : NotFound();
        }
        catch (DbException e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e);
        }
    }

    [HttpPost(Name = "CreateCompany")]
    public ActionResult<Company> CreateCompany(Company company)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        try
        {
            db.Companies.Add(company);
            db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCompany), new { id = company.Id }, company);
        }
        catch (DbUpdateException e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e);
        }
    }

    [HttpPut(Name = "UpdateCompany")]
    public ActionResult<Company> UpdateCompany(Company company)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        try
        {
            var companyToUpdate = db.Companies.Find(company.Id);
            if (companyToUpdate == null) return NotFound();
            db.Entry(companyToUpdate).CurrentValues.SetValues(company);
            db.SaveChanges();
            return NoContent();
        }
        catch (DbException e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e);
        }
    }

    [HttpDelete("{id}", Name = "DeleteCompany")]
    public ActionResult<Company> DeleteCompany(int id)
    {
        try
        {
            var companyToDelete = db.Companies.Find(id);
            if (companyToDelete == null) return NotFound();
            db.Companies.Remove(companyToDelete);
            db.SaveChanges();
            return NoContent();
        }
        catch (DbException e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e);
        }
    }
}