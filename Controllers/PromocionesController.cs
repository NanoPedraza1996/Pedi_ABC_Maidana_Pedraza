using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Pedi_ABC.Data;
using Pedi_ABC.Models;

namespace Pedi_ABC.Controllers;

public class PromocionesController : Controller
{
    private readonly ILogger<PromocionesController> _logger;
    private PediABCDbContext _contexto;

    public PromocionesController(ILogger<PromocionesController> logger, PediABCDbContext contexto)
    {
        _logger = logger;
        _contexto = contexto;
    }

    public IActionResult Index()
    {
        return View();
    }


    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}