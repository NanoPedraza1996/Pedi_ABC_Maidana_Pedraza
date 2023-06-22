using Microsoft.EntityFrameworkCore;
using ProyectoFinal.Models;

namespace Pedi_ABC.Data;

public class PediABCDbContext : DbContext
{
    public PediABCDbContext(DbContextOptions<PediABCDbContext> options)
    : base(options)
    {
    }
    public DbSet<Cliente> Clientes { get; set; }

    public DbSet<Producto> Productos { get; set; }

    public DbSet<Promocion> Promociones { get; set; }
}