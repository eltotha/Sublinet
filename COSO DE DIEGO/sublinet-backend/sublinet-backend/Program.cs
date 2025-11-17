using Microsoft.EntityFrameworkCore;
using Sublinet.Api.Data;
using System.Text.Json.Serialization; // Para IgnoreCycles

var builder = WebApplication.CreateBuilder(args);

// ========== CONEXIÓN A BD ==========
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
                     ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// ========== CONTROLLERS + JSON (CICLOS EF) ==========
builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        // Evita el error: "A possible object cycle was detected"
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;

        // Opcional: no enviar propiedades null
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;

        // Opcional: JSON bonito en Swagger
        options.JsonSerializerOptions.WriteIndented = true;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ========== CORS PARA REACT ==========
const string ReactCorsPolicy = "AllowReact";

builder.Services.AddCors(options =>
{
    options.AddPolicy(ReactCorsPolicy, policy =>
    {
        policy
            .WithOrigins("http://localhost:3000") // frontend
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();                  // importante si usás credentials: 'include'
    });
});

var app = builder.Build();

// ========== MIDDLEWARE PIPELINE ==========
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Solo forzamos HTTPS en producción, en dev lo dejamos en HTTP para no joder:
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors(ReactCorsPolicy);

app.UseAuthorization();

app.MapControllers();

app.Run();
