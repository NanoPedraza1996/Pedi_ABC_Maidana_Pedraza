using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Pedi_ABC.Data;
using Pedi_ABC.Models;
using ProyectoFinal.Models;

namespace Pedi_ABC.Controllers;

public class ProductosController : Controller
{
    private readonly ILogger<ProductosController> _logger;
    private PediABCDbContext _contexto;

    public ProductosController (ILogger<ProductosController> logger, PediABCDbContext contexto)
    {
        _logger = logger;
        _contexto = contexto;
    }

    public IActionResult Index()
    {
        var producto = _contexto.Productos.Where(p => p.Eliminado == false).ToList();
        return View();
    }

    public JsonResult BuscarProductos(int productoID = 0)
    {
        var producto = _contexto.Productos.ToList();

        if (productoID > 0)
        {
            producto = producto.Where(p => p.ProductoID == productoID).OrderBy(p => p.Nombre).ToList();
        }

        return Json(producto);
    }

    
    public JsonResult GuardarProducto(int productoID, string nombre, string descripcion, string precio, int cantidad, string foto, Disponibilidad disponible)
    {
        bool resultado = false;

        if (!string.IsNullOrEmpty(nombre))
        {


            //SI ES 0 QUIERE DECIR QUE ESTA CREANDO LA CATEGORIA
            if (productoID == 0)
            {
                //BUSCAMOS EN LA TABLA SI EXISTE UNA CON LA MISMA DESCRIPCION
                var productoOriginal = _contexto.Productos.Where(p => p.Nombre == nombre && p.Descripcion == descripcion && p.Precio == precio && p.Cantidad == cantidad).FirstOrDefault();
                if (productoOriginal == null)
                {
                    //DECLAMOS EL OBJETO DANDO EL VALOR
                    var productoGuardar = new Producto
                    {
                        Nombre = nombre,
                        Descripcion = descripcion,
                        Precio = precio,
                        Cantidad = cantidad
                    };
                    _contexto.Add(productoGuardar);
                    _contexto.SaveChanges();
                    resultado = true;

                }


            }
            else
            {
                //BUSCAMOS EN LA TABLA SI EXISTE UNA CON LA MISMA DESCRIPCION Y DISTINTO ID DE REGISTRO AL QUE ESTAMOS EDITANDO
                var productoOriginal = _contexto.Productos.Where(p => p.Nombre == nombre && p.Descripcion == descripcion && p.Precio == precio && p.Cantidad == cantidad).FirstOrDefault();
                if (productoOriginal == null)
                {
                    //crear variable que guarde el objeto segun el id deseado
                    var productoEditar = _contexto.Productos.Find(productoID);
                    if (productoEditar != null)
                    {
                        productoEditar.Nombre = nombre;
                        productoEditar.Descripcion = descripcion;
                        productoEditar.Precio = precio;
                        productoEditar.Cantidad = cantidad;
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