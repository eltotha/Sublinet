using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sublinet.Api.Data;
using Sublinet.Api.Models;

namespace Sublinet.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BudgetsController : ControllerBase
{
    private readonly AppDbContext _context;

    public BudgetsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Budget>>> GetAll()
    {
        var budgets = await _context.Budgets.ToListAsync();
        return Ok(budgets);
    }

    [HttpGet("latest")]
    public async Task<ActionResult<Budget>> GetLatest()
    {
        var budget = await _context.Budgets
            .OrderByDescending(b => b.CreatedAt)
            .FirstOrDefaultAsync();

        if (budget == null) return NotFound();
        return Ok(budget);
    }

    [HttpPost]
    public async Task<ActionResult<Budget>> Create(Budget budget)
    {
        _context.Budgets.Add(budget);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = budget.Id }, budget);
    }
}
