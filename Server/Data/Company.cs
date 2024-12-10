using System.Text.Json.Serialization;

namespace simple_employee_backend.Data;

public class Company
{
    [JsonPropertyName("id")]
    public int Id { get; set; }
    
    [JsonPropertyName("companyName")]
    public required string CompanyName { get; set; }
    
    [JsonPropertyName("shortDescription")]
    public required string ShortDescription { get; set; }
    
    [JsonPropertyName("imageUrl")]
    public required string ImageUrl { get; set; }
}