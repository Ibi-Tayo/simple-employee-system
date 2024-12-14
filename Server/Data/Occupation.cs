using System.Text.Json.Serialization;

namespace simple_employee_backend.Data;

public class Occupation
{
    [JsonPropertyName("id")]
    public int Id { get; set; }
    
    [JsonPropertyName("job")]
    public required string Job { get; set; }
    
    [JsonPropertyName("shortDescription")]
    public required string ShortDescription { get; set; }
    
    [JsonPropertyName("imageUrl")]
    public required string ImageUrl { get; set; }
}