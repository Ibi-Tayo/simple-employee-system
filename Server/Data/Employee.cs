using System.Text.Json.Serialization;

namespace simple_employee_backend.Data;

public class Employee
{
    [JsonPropertyName("id")] 
    public required string Id { get; set; } = Guid.NewGuid().ToString();
    
    [JsonPropertyName("name")]
    public required string Name { get; set; }
    
    [JsonPropertyName("dateOfBirth")]
    public required string DateOfBirth { get; set; }
    
    [JsonPropertyName("job")]
    public required string Job { get; set; }
    
    [JsonPropertyName("yearsOfExperience")]
    public int YearsOfExperience { get; set; }
    
    [JsonPropertyName("company")]
    public required string Company { get; set; }
    
    [JsonPropertyName("city")]
    public required string City { get; set; }
    
    [JsonPropertyName("salary")]
    public int Salary { get; set; }
    
    [JsonPropertyName("address")]
    public required string Address { get; set; }
    
    [JsonPropertyName("postcode")]
    public required string PostCode { get; set; }
    
}