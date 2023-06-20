using Microsoft.EntityFrameworkCore;

namespace Pedi_ABC.Data;

public class PediABCDbContext : DbContext
{
    public PediABCDbContext(DbContextOptions<PediABCDbContext> options)
    : base(options)
    {
    }
}