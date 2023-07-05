using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Pedi_ABC.Data;
using Pedi_ABC.Models;

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


    public JsonResult BuscarProductos(int productoID = 0)
    {
        var producto = _contexto.Productos.ToList();

        if (productoID > 0)
        {
            producto = producto.Where(p => p.ProductoID == productoID).OrderBy(p => p.Nombre).ToList();
        }

        foreach (var productos in producto)
        {
            if (productos.Imagen != null)
            {
                productos.ImagenBase64 = System.Convert.ToBase64String(productos.Imagen);
            }
        }

        return Json(producto);
    }


    public JsonResult GuardarProductos(int productoID, string nombre, string descripcion, decimal precio, decimal cantidad, IFormFile imagen, Disponible disponibilidad)
    {
        bool resultado = false;

        if (!string.IsNullOrEmpty(nombre))
        {
            nombre = nombre.ToUpper();
            //SI ES 0 QUIERE DECIR QUE ESTA CREANDO LA CATEGORIA
            if (productoID == 0)
            {
                //BUSCAMOS EN LA TABLA SI EXISTE UNA CON LA MISMA DESCRIPCION
                var productoOriginal = _contexto.Productos.Where(p => p.Nombre == nombre && p.Descripcion == descripcion && p.Precio == precio && p.Cantidad == cantidad && p.Disponibilidad == disponibilidad).FirstOrDefault();
                if (productoOriginal == null)
                {
                    //DECLAMOS EL OBJETO DANDO EL VALOR
                    var productoGuardar = new Producto
                    {
                        Nombre = nombre,
                        Descripcion = descripcion,
                        Precio = precio,
                        Cantidad = cantidad,
                        Disponibilidad = disponibilidad,
                    };


                    if (imagen != null && imagen.Length > 0)
                    {
                        byte[] imagenBinaria = null;
                        using (var fs1 = imagen.OpenReadStream())
                        using (var ms1 = new MemoryStream())
                        {
                            fs1.CopyTo(ms1);
                            imagenBinaria = ms1.ToArray();
                        }
                        productoGuardar.Imagen = imagenBinaria;
                        productoGuardar.TipoImagen = imagen.ContentType;
                        productoGuardar.NombreImagen = imagen.FileName;
                    }

                    _contexto.Add(productoGuardar);
                    _contexto.SaveChanges();
                    resultado = true;

                }
            }
            else
            {
                //BUSCAMOS EN LA TABLA SI EXISTE UNA CON LA MISMA DESCRIPCION Y DISTINTO ID DE REGISTRO AL QUE ESTAMOS EDITANDO
                var productoOriginal = _contexto.Productos.Where(p => p.Nombre == nombre && p.Descripcion == descripcion && p.Precio == precio && p.Cantidad == cantidad && p.Disponibilidad == disponibilidad).FirstOrDefault();
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
                        productoEditar.Disponibilidad = disponibilidad;
                        _contexto.SaveChanges();
                        resultado = true;
                    }
                }
            }
        }

        return Json(resultado);
    }


    // public JsonResult DesahabilitarProductos(int ProductoID, int Eliminado)
    // {
    //     int resultado = 0;
    //     var producto = _contexto.Productos.Find(ProductoID);
    //     if (producto != null)
    //     {
    //         if (Eliminado == 0)
    //         {
    //             producto.Eliminado = false;
    //             _contexto.SaveChanges();
    //         }
    //         else
    //         {
    //             if (Eliminado == 1)
    //             {
    //                 producto.Eliminado = true;
    //                 _contexto.SaveChanges();
    //             }
    //         }
    //     }

    //     resultado = 1;

    //     return Json(resultado);
    // }

    public JsonResult DesahabilitarProductos(int productoID, int eliminado)
    {
        // int resultado = 0;
        // SE BUSCA EL ID DE LA CATEGORIA EN EL CONTEXTO
        var producto = _contexto.Productos.Find(productoID);
        if (producto != null)
        {
            if (eliminado == 1)
            {
                producto.Eliminado = true;
                _contexto.SaveChanges();
            }
            else
            {
                if (eliminado == 0)
                {
                    producto.Eliminado = false;
                    _contexto.SaveChanges();
                }
                else
                {
                }

            }
        }

        return Json(producto);
    }


    public JsonResult EliminarProductos(int productoID, int eliminado)
    {
        // int resultado = 0;
        var producto = _contexto.Productos.Find(productoID);
        if (producto != null)
        {
            if (eliminado == 0)
            {
                producto.Eliminado = true;
                _contexto.Productos.Remove(producto);
                _contexto.SaveChanges();
                _contexto.Update(producto);
            }
            else
            {
                if (eliminado == 0)
                {
                    producto.Eliminado = false;
                    _contexto.SaveChanges();
                }
                else
                {
                }
            }
        }

        return Json(producto);
    }


    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }



}