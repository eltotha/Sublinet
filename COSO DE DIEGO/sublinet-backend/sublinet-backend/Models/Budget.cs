using System.ComponentModel.DataAnnotations;

namespace Sublinet.Api.Models;

public class Budget
{
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string PeriodName { get; set; } = null!;

    public decimal TotalAmount { get; set; }

    public decimal UsedAmount { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
