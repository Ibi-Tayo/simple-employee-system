using Microsoft.EntityFrameworkCore;
using simple_employee_backend.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddDbContext<DataContext>(opt 
    => opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

using (var serviceScope = app.Services.CreateScope())
{
    var context = serviceScope.ServiceProvider.GetRequiredService<DataContext>();
    if (!context.Database.CanConnect())
    {
        throw new Exception($"Cannot connect to database: {context.Database.GetDbConnection().ConnectionString}");
    }
}

app.UseCors(b => b
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());   

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();