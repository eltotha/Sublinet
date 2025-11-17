using System.ComponentModel.DataAnnotations;

namespace Sublinet.Api.Models;

public enum InvoiceStatus
{
    PAGADA,
    PENDIENTE,
    ANULADA
}

public class Invoice
{
    public int Id { get; set; }

    [Required, MaxLength(30)]
    public string InvoiceNumber { get; set; } = null!;

    public int CustomerId { get; set; }
    public Customer Customer { get; set; } = null!;

    public DateTime Date { get; set; }

    [MaxLength(50)]
    public string? PaymentMethod { get; set; }

    public InvoiceStatus Status { get; set; } = InvoiceStatus.PENDIENTE;

    public decimal Total { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<InvoiceItem> Items { get; set; } = new List<InvoiceItem>();
}
