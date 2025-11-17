using Microsoft.EntityFrameworkCore;
using Sublinet.Api.Models;

namespace Sublinet.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Invoice> Invoices => Set<Invoice>();
    public DbSet<InvoiceItem> InvoiceItems => Set<InvoiceItem>();
    public DbSet<Budget> Budgets => Set<Budget>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Map enum to string for InvoiceStatus to match MySQL ENUM
        modelBuilder.Entity<Invoice>()
            .Property(i => i.Status)
            .HasConversion<string>();

        // Seed data opcional mínimo
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Ropa" }
        );

        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "Camisa Azul", CategoryId = 1, Price = 20.00m, Stock = 25 },
            new Product { Id = 2, Name = "Camisa Blanca", CategoryId = 1, Price = 18.00m, Stock = 40 },
            new Product { Id = 3, Name = "Camisa Negra", CategoryId = 1, Price = 22.00m, Stock = 30 },
            new Product { Id = 4, Name = "Camisa Roja", CategoryId = 1, Price = 19.00m, Stock = 15 }
        );
    }
}
