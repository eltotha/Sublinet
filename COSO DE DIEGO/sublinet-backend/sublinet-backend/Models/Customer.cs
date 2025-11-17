using System.ComponentModel.DataAnnotations;

namespace Sublinet.Api.Models;

public class Customer
{
    public int Id { get; set; }

    [Required, MaxLength(120)]
    public string Name { get; set; } = null!;

    [MaxLength(200)]
    public string? Address { get; set; }

    [MaxLength(30)]
    public string? Phone { get; set; }

    [MaxLength(120)]
    public string? Email { get; set; }

    public ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();
}
