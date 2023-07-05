using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Pedi_ABC.Data;
using Pedi_ABC.Models;

namespace Pedi_ABC.Controllers;

public class PromocionesController : Controller
{
    private readonly ILogger<PromocionesController> _logger;
    private PediABCDbContext _contexto;

    public PromocionesController (ILogger<PromocionesController> logger, PediABCDbContext contexto)
    {
        _logger = logger;
        _contexto = contexto;
    }

    public IActionResult Index()
    {
        return View();
    }


    public JsonResult BuscarPromociones(int promocionID = 0)
    {
        var promocion = _contexto.Promociones.ToList();

        if (promocionID > 0)
        {
            promocion = promocion.Where(p => p.PromocionID == promocionID).OrderBy(p => p.Nombre).ToList();
        }

        foreach (var promociones in promocion)
        {
            if (promociones.Imagen != null)
            {
                promociones.ImagenBase64 = System.Convert.ToBase64String(promociones.Imagen);
            }
        }

        return Json(promocion);
    }

// IFormFile imagen

    public JsonResult GuardarPromociones(int promocionID, string nombre, string descripcion, decimal precio, decimal cantidad, IFormFile imagen, Disponible disponibilidad)
    {
        bool resultado = false;

        if (!string.IsNullOrEmpty(nombre))
        {
            nombre = nombre.ToUpper();
            //SI ES 0 QUIERE DECIR QUE ESTA CREANDO LA CATEGORIA
            if (promocionID == 0)
            {
                //BUSCAMOS EN LA TABLA SI EXISTE UNA CON LA MISMA DESCRIPCION
                var promocionOriginal = _contexto.Promociones.Where(p => p.Nombre == nombre && p.Descripcion == descripcion && p.Precio == precio && p.Cantidad == cantidad && p.Disponibilidad == disponibilidad).FirstOrDefault();
                if (promocionOriginal == null)
                {
                    //DECLAMOS EL OBJETO DANDO EL VALOR
                    var promocionGuardar = new Promocion
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
                        promocionGuardar.Imagen = imagenBinaria;
                        promocionGuardar.TipoImagen = imagen.ContentType;
                        promocionGuardar.NombreImagen = imagen.FileName;
                    }

                    _contexto.Add(promocionGuardar);
                    _contexto.SaveChanges();
                    resultado = true;

                }
            }
            else
            {
                //BUSCAMOS EN LA TABLA SI EXISTE UNA CON LA MISMA DESCRIPCION Y DISTINTO ID DE REGISTRO AL QUE ESTAMOS EDITANDO
                var promocionOriginal = _contexto.Productos.Where(p => p.Nombre == nombre && p.Descripcion == descripcion && p.Precio == precio && p.Cantidad == cantidad && p.Disponibilidad == disponibilidad).FirstOrDefault();
                if (promocionOriginal == null)
                {
                    //crear variable que guarde el objeto segun el id deseado
                    var promocionEditar = _contexto.Productos.Find(promocionID);
                    if (promocionEditar != null)
                    {
                        promocionEditar.Nombre = nombre;
                        promocionEditar.Descripcion = descripcion;
                        promocionEditar.Precio = precio;
                        promocionEditar.Cantidad = cantidad;
                        promocionEditar.Disponibilidad = disponibilidad;
                        _contexto.SaveChanges();
                        resultado = true;
                    }
                }
            }
        }

        return Json(resultado);
    }

    public JsonResult DesahabilitarPromociones(int promocionID, int eliminado)
    {
        // int resultado = 0;
        // SE BUSCA EL ID DE LA CATEGORIA EN EL CONTEXTO
        var promocion = _contexto.Promociones.Find(promocionID);
        if (promocion != null)
        {
            if (eliminado == 1)
            {
                promocion.Eliminado = true;
                _contexto.SaveChanges();
            }
            else
            {
                if (eliminado == 0)
                {
                    promocion.Eliminado = false;
                    _contexto.SaveChanges();
                }
                else
                {
                }

            }
        }

        return Json(promocion);
    }


    public JsonResult EliminarPromociones(int promocionID, int eliminado)
    {
        // int resultado = 0;
        var promocion = _contexto.Promociones.Find(promocionID);
        if (promocion != null)
        {
            if (eliminado == 0)
            {
                promocion.Eliminado = true;
                _contexto.Promociones.Remove(promocion);
                _contexto.SaveChanges();
                _contexto.Update(promocion);
            }
            else
            {
                if (eliminado == 0)
                {
                    promocion.Eliminado = false;
                    _contexto.SaveChanges();
                }
                else
                {
                }
            }
        }

        return Json(promocion);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}