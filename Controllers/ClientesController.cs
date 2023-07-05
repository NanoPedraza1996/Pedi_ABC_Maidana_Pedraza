using Microsoft.AspNetCore.Mvc;
using Pedi_ABC.Data;

namespace Pedi_ABC.Controllers;

public class ClientesController : Controller
{
    private readonly ILogger<ClientesController> _logger;
    private PediABCDbContext _contexto;

    public ClientesController (ILogger<ClientesController>logger, PediABCDbContext contexto)
    {
        _logger = logger;
        _contexto = contexto;
    }
    public IActionResult Index()
    {
        return View();
    }
}