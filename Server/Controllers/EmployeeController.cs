using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using simple_employee_backend.Data;

namespace simple_employee_backend.Controllers;

[ApiController]
[Route("employees")]
public class EmployeeController(ILogger<EmployeeController> logger, DataContext db) : ControllerBase
{
    private readonly ILogger<EmployeeController> _logger = logger;

    [HttpGet(Name = "GetPaginatedEmployees")]
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees(
        [FromQuery(Name = "_page")] int? page = null,
        [FromQuery(Name = "_per_page")] int? pageSize = null)
    {
        try
        {
            if (!page.HasValue || !pageSize.HasValue)
            {
                var allEmployees = await db.Employees.ToListAsync();
                return Ok(allEmployees);
            }

            var employees = await db.Employees
                .Skip((page.Value - 1) * pageSize.Value)
                .Take(pageSize.Value)
                .ToListAsync();

            return Ok(employees);
        }
        catch (DbException ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpGet("{id}", Name = "GetEmployee")]
    public async Task<ActionResult<Employee>> GetEmployee(string id)
    {
        try
        {
            var employee = await db.Employees.FindAsync(id);
            return employee != null ? Ok(employee) : NotFound();
        }
        catch (DbException e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e);
        }
    }

    [HttpPost(Name = "CreateEmployee")]
    public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        try
        {
            db.Employees.Add(employee);
            await db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
        }
        catch (DbUpdateException e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e);
        }
    }

    [HttpPut(Name = "UpdateEmployee")]
    public async Task<ActionResult<Employee>> UpdateEmployee(Employee employee)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        try
        {
            var employeeToUpdate = await db.Employees.FindAsync(employee.Id);
            if (employeeToUpdate == null) return NotFound();
            db.Entry(employeeToUpdate).CurrentValues.SetValues(employee);
            await db.SaveChangesAsync();
            return StatusCode(StatusCodes.Status201Created, employee);
        }
        catch (DbException e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e);
        }
    }

    [HttpDelete("{id}", Name = "DeleteEmployee")]
    public async Task<ActionResult<Employee>> DeleteEmployee(string id)
    {
        try
        {
            var employeeToDelete = await db.Employees.FindAsync(id);
            if (employeeToDelete == null) return NotFound();
            db.Employees.Remove(employeeToDelete);
            await db.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, employeeToDelete);
        }
        catch (DbException e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e);
        }
    }
}