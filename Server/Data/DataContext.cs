using Microsoft.EntityFrameworkCore;

namespace simple_employee_backend.Data;

public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
{
    public DbSet<Company> Companies { get; set; }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Occupation> Jobs { get; set; }
}