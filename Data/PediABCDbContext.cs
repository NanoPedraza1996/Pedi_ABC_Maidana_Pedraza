using Microsoft.EntityFrameworkCore;
using Pedi_ABC.Models;

namespace Pedi_ABC.Data;

public class PediABCDbContext : DbContext
{
    public PediABCDbContext(DbContextOptions<PediABCDbContext> options)
    : base(options)
    {
    }
    public DbSet<Producto> Productos { get; set; }

    public DbSet<Promocion> Promociones { get; set; }
}