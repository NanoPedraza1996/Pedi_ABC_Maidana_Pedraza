using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Pedi_ABC.Data;
using Pedi_ABC.Models;

namespace Pedi_ABC.Controllers;

public class PedidosController : Controller
{
    private readonly ILogger<PedidosController> _logger;
    private PediABCDbContext _contexto;

    public PedidosController(ILogger<PedidosController> logger, PediABCDbContext contexto)
    {
        _logger = logger;
        _contexto = contexto;
    }

    public IActionResult Index()
    {
        //  var subCategoria = _contexto.SubCategorias.Where(s => s.Eliminado == false).ToList();
        // ViewBag.ProductoID = new SelectList(producto, "ProductoID", "Nombre");
        return View();

    }


    public IActionResult Create()
    {
        // if (ModelState.IsValid)
        // {
        //     using (var transaccion = _context.Database.BeginTransaction())
        //         {
        //             try
        //             {
        //                 _context.Add(alquileres);
        //                 await _context.SaveChangesAsync();

        //                 var peliculaTemp = (from a in _context.AlquileresDetallesTemporal select a).ToList();
        //                 foreach (var item in peliculaTemp)
        //                 {
        //                     var detalles = new DetallesAlquileres
        //                     {
        //                         AlquilesresID = alquileres.AlquilesresID,
        //                         PeliculasID = item.PeliculasID,
        //                         PeliculasNombre = item.PeliculasNombre
        //                     };
        //                     _context.DetallesAlquileres.Add(detalles);
        //                     _context.SaveChanges();
        //                 }
        //                 _context.AlquileresDetallesTemporal.RemoveRange(peliculaTemp);
        //                 _context.SaveChanges();

        //                 transaccion.Commit();

        //                 return RedirectToAction(nameof(Index));
        //             }
        //             catch (System.Exception ex)
        //             {
        //                 transaccion.Rollback();
        //                 var error = ex;
        //             }
        //         }
        //     }
        // }
        //  var subCategoria = _contexto.SubCategorias.Where(s => s.Eliminado == false).ToList();
        ViewBag.ProductoID = new SelectList(_contexto.Productos.Where(x => x.EstaPedido == false), "ProductoID", "Nombre");
        return View();

    }


    public JsonResult AgregarProductoTemporal(int ProductoID)
    {
        var resultado = true;

        using (var transaccion = _contexto.Database.BeginTransaction())
        {
            try
            {
                var producto = (from a in _contexto.Productos where a.ProductoID == ProductoID select a).SingleOrDefault();
                producto.EstaPedido = true;
                _contexto.SaveChanges();

                var productosTemp = new DetallePedidoTemporal
                {
                    ProductoID = producto.ProductoID,
                    Nombre = producto.Nombre
                };
                _contexto.DetallePedidoTemporales.Add(productosTemp);
                _contexto.SaveChanges();

                transaccion.Commit();
            }
            catch (System.Exception)
            {
                transaccion.Rollback();
                resultado = false;
            }
        }

        ViewBag.ProductoID = new SelectList(_contexto.Productos.Where(x => x.EstaPedido == false), "ProductoID", "Nombre");
        return Json(resultado);
    }


    public JsonResult QuitarProducto(int ProductoID)
        {

            var resultado = true;

            using (var transaccion = _contexto.Database.BeginTransaction())
            {
                try
                {
                    var productos = (from a in _contexto.Productos where a.ProductoID == ProductoID select a).SingleOrDefault();
                    productos.EstaPedido = false;
                    _contexto.SaveChanges();

                    var pedidoTemporal = (from a in _contexto.DetallePedidoTemporales where a.ProductoID == ProductoID select a).SingleOrDefault();
                    _contexto.DetallePedidoTemporales.Remove(pedidoTemporal);
                    _contexto.SaveChanges();

                    transaccion.Commit();
                }
                catch (System.Exception)
                {
                    transaccion.Rollback();
                    resultado = false;
                }
            }

            return Json(resultado);
        }


        public JsonResult CancelarPedido()
        {

            var resultado = true;

            using (var transaccion = _contexto.Database.BeginTransaction())
            {
                try
                {
                    var pedidoTemporal = (from a in _contexto.DetallePedidoTemporales select a).ToList();

                    foreach (var item in pedidoTemporal)
                    {
                        var producto = (from a in _contexto.Productos where a.ProductoID == item.ProductoID select a).SingleOrDefault();
                        producto.EstaPedido = false;
                        _contexto.SaveChanges();
                    }
                    _contexto.DetallePedidoTemporales.RemoveRange(pedidoTemporal);
                    _contexto.SaveChanges();

                    transaccion.Commit();
                }
                catch (System.Exception)
                {
                    transaccion.Rollback();
                    resultado = false;
                }
            }

            return Json(resultado);
        }


    public JsonResult BuscarProductoTemporal ()
    {
        List<DetallePedidoTemporal> listadoProductoTemp = new List<DetallePedidoTemporal>();

        var detallePedidoTemporal = (from a in _contexto.DetallePedidoTemporales select a).ToList();
            foreach (var item in detallePedidoTemporal)
            {
                listadoProductoTemp.Add(item);
            }

            return Json(listadoProductoTemp);
    }

    public JsonResult BuscarProducto(int PedidosID)
        {

            List<DetallePedido> listadoProducto = new List<DetallePedido>();

            var pedidoDetalles = (from a in _contexto.DetallePedidos where a.PedidoID == PedidosID select a).ToList();
            foreach (var item in pedidoDetalles)
            {
                listadoProducto.Add(item);
            }

            return Json(listadoProducto);
        }


}