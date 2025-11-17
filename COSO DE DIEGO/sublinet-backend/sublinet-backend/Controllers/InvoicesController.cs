using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sublinet.Api.Data;
using Sublinet.Api.Models;

namespace Sublinet.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvoicesController : ControllerBase
{
    private readonly AppDbContext _context;

    public InvoicesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Invoice>>> GetAll()
    {
        var invoices = await _context.Invoices
            .Include(i => i.Customer)
            .Include(i => i.Items)
                .ThenInclude(it => it.Product)
            .ToListAsync();

        return Ok(invoices);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Invoice>> GetById(int id)
    {
        var invoice = await _context.Invoices
            .Include(i => i.Customer)
            .Include(i => i.Items)
                .ThenInclude(it => it.Product)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (invoice == null) return NotFound();
        return Ok(invoice);
    }

    public class CreateInvoiceRequest
    {
        public string InvoiceNumber { get; set; } = null!;
        public int CustomerId { get; set; }
        public DateTime Date { get; set; }
        public string? PaymentMethod { get; set; }
        public List<InvoiceItemDto> Items { get; set; } = new();
    }

    public class InvoiceItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }

    [HttpPost]
    public async Task<ActionResult<Invoice>> Create(CreateInvoiceRequest request)
    {
        var invoice = new Invoice
        {
            InvoiceNumber = request.InvoiceNumber,
            CustomerId = request.CustomerId,
            Date = request.Date,
            PaymentMethod = request.PaymentMethod,
            Status = InvoiceStatus.PENDIENTE
        };

        decimal total = 0;

        foreach (var item in request.Items)
        {
            var subtotal = item.UnitPrice * item.Quantity;
            total += subtotal;

            invoice.Items.Add(new InvoiceItem
            {
                ProductId = item.ProductId,
                Quantity = item.Quantity,
                UnitPrice = item.UnitPrice,
                Subtotal = subtotal
            });

            // Descontar del stock
            var product = await _context.Products.FindAsync(item.ProductId);
            if (product != null)
            {
                product.Stock -= item.Quantity;
            }
        }

        invoice.Total = total;

        _context.Invoices.Add(invoice);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = invoice.Id }, invoice);
    }

    [HttpGet("pending/latest")]
    public async Task<ActionResult<Invoice>> GetLatestPending()
    {
        var invoice = await _context.Invoices
            .Where(i => i.Status == InvoiceStatus.PENDIENTE)
            .OrderByDescending(i => i.Date)
            .Include(i => i.Customer)
            .FirstOrDefaultAsync();

        if (invoice == null) return NotFound();
        return Ok(invoice);
    }

    [HttpPost("{id:int}/pay")]
    public async Task<IActionResult> MarkAsPaid(int id)
    {
        var invoice = await _context.Invoices.FindAsync(id);
        if (invoice == null) return NotFound();

        invoice.Status = InvoiceStatus.PAGADA;
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
