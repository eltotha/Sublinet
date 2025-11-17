using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sublinet.Api.Data;

namespace Sublinet.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    public record LoginRequest(string Username, string Password);

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        // OJO: Esto es demo, no usa hashes reales ni JWT.
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Username == request.Username);

        if (user == null)
            return Unauthorized(new { message = "Credenciales inválidas" });

        // Aquí deberías validar el hash. Por ahora acepta cualquier password.
        return Ok(new { message = "Login ok (demo)", username = user.Username });
    }
}
