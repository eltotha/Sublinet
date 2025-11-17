using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sublinet.Api.Data;
using Sublinet.Api.Models;

namespace Sublinet.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Products
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetAll()
    {
        var products = await _context.Products
            .Where(p => p.IsActive)           // 👈 Solo activos
            .Include(p => p.Category)
            .ToListAsync();

        return Ok(products);
    }

    // GET: api/Products/5
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> GetById(int id)
    {
        var product = await _context.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == id && p.IsActive);

        if (product == null) return NotFound();
        return Ok(product);
    }

    // POST: api/Products
    [HttpPost]
    public async Task<ActionResult<Product>> Create([FromBody] Product product)
    {
        // por si acaso
        product.IsActive = true;
        product.CreatedAt = DateTime.UtcNow;

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        // Devolvemos el producto creado con su ID
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    // PUT: api/Products/5
    [HttpPut("{id:int}")]
    public async Task<ActionResult<Product>> Update(int id, [FromBody] Product product)
    {
        if (id != product.Id)
            return BadRequest("El id de la URL no coincide con el del cuerpo.");

        var existing = await _context.Products
            .FirstOrDefaultAsync(p => p.Id == id && p.IsActive);

        if (existing == null)
            return NotFound();

        // Campos editables
        existing.Name       = product.Name;
        existing.Price      = product.Price;
        existing.Stock      = product.Stock;
        existing.CategoryId = product.CategoryId;

        await _context.SaveChangesAsync();

        // 👉 Devolvemos JSON para que el frontend pueda hacer res.json()
        return Ok(existing);
    }

    // DELETE: api/Products/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _context.Products
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
            return NotFound();

        // 🔥 SOFT DELETE:
        // No lo borramos físico para no romper FK con InvoiceItems
        product.IsActive = false;

        await _context.SaveChangesAsync();

        return NoContent();
    }
}
