using System.Text.Json.Serialization;

namespace simple_employee_backend.Data;

public class Employee
{
    [JsonPropertyName("id")] 
    public string Id { get; set; } = Guid.NewGuid().ToString();
    
    [JsonPropertyName("name")]
    public string Name { get; set; }
    
    [JsonPropertyName("dateOfBirth")]
    public string DateOfBirth { get; set; }
    
    [JsonPropertyName("job")]
    public string Job { get; set; }
    
    [JsonPropertyName("yearsOfExperience")]
    public int YearsOfExperience { get; set; }
    
    [JsonPropertyName("company")]
    public string Company { get; set; }
    
    [JsonPropertyName("city")]
    public string City { get; set; }
    
    [JsonPropertyName("salary")]
    public int Salary { get; set; }
    
    [JsonPropertyName("address")]
    public string Address { get; set; }
    
    [JsonPropertyName("postcode")]
    public string PostCode { get; set; }
    
}