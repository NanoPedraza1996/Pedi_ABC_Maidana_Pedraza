using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pedi_ABC.Data;
using Pedi_ABC.Models;
using ProyectoFinal.Models;

namespace Pedi_ABC.Controllers;

public class ClientesController : Controller
{
    private readonly ILogger<ClientesController> _logger;
    private PediABCDbContext _contexto;

    public ClientesController (ILogger<ClientesController> logger, PediABCDbContext contexto)
    {
        _logger = logger;
        _contexto = contexto;
    }

    public IActionResult Index()
    {
        var cliente = _contexto.Clientes.Where(c => c.Eliminado == false).ToList();
        // ViewBag.CategoriaID = new SelectList(cliente, "CategoriaID", "Descripcion");
        return View();
    }



    public JsonResult BuscarClientes(int clienteID = 0)
    {
        var clientes = _contexto.Clientes.ToList();

        if (clienteID > 0)
        {
            clientes = clientes.Where(c => c.ClienteID == clienteID).OrderBy(c => c.NombreApellido).ToList();
        }

        return Json(clientes);
    }


    public JsonResult GuardarCliente(int clienteID, string nombreApellido, string direccion, string telefono)
    {
        bool resultado = false;

        if (!string.IsNullOrEmpty(nombreApellido))
        {


            //SI ES 0 QUIERE DECIR QUE ESTA CREANDO LA CATEGORIA
            if (clienteID == 0)
            {
                //BUSCAMOS EN LA TABLA SI EXISTE UNA CON LA MISMA DESCRIPCION
                var clienteOriginal = _contexto.Clientes.Where(c => c.NombreApellido == nombreApellido && c.Direccion == direccion && c.Telefono == telefono).FirstOrDefault();
                if (clienteOriginal == null)
                {
                    //DECLAMOS EL OBJETO DANDO EL VALOR
                    var ClienteGuardar = new Cliente
                    {
                        NombreApellido = nombreApellido,
                        Direccion = direccion,
                        Telefono = telefono
                    };
                    _contexto.Add(ClienteGuardar);
                    _contexto.SaveChanges();
                    resultado = true;

                }


            }
            else
            {
                //BUSCAMOS EN LA TABLA SI EXISTE UNA CON LA MISMA DESCRIPCION Y DISTINTO ID DE REGISTRO AL QUE ESTAMOS EDITANDO
                var clienteOriginal = _contexto.Clientes.Where(c => c.NombreApellido == nombreApellido && c.Direccion == direccion && c.Telefono == telefono).FirstOrDefault();
                if (clienteOriginal == null)
                {
                    //crear variable que guarde el objeto segun el id deseado
                    var clienteEditar = _contexto.Clientes.Find(clienteID);
                    if (clienteEditar != null)
                    {
                        clienteEditar.NombreApellido = nombreApellido;
                        clienteEditar.Direccion = direccion;
                        clienteEditar.Telefono = telefono;
                        _contexto.SaveChanges();
                        resultado = true;
                    }
                }


            }
        }

        return Json(resultado);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}