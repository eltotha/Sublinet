using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sublinet.Api.Data;
using Sublinet.Api.Models;

namespace Sublinet.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private readonly AppDbContext _context;

    public CustomersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Customer>>> GetAll()
    {
        var customers = await _context.Customers.ToListAsync();
        return Ok(customers);
    }

    [HttpPost]
    public async Task<ActionResult<Customer>> Create(Customer customer)
    {
        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = customer.Id }, customer);
    }
}
