using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pedi_ABC.Models;

public class Producto
{
    [Key]
    public int ProductoID { get; set; }


    [Display(Name = "Nombre Del Producto")]
    [Required(ErrorMessage = "El Nombre Del Producto es Obligatorio.")]
    public string? Nombre { get; set; }


    [Display(Name = "Descripcion Del Producto")]
    [Required(ErrorMessage = "La Descripcion Del Producto es Obligatorio.")]
    public string? Descripcion { get; set; }


    [Display(Name = "Precio Del Producto")]
    [Required(ErrorMessage = "El Precio Del Producto es Obligatorio.")]
    public decimal Precio { get; set; }


    [Display(Name = "Cantidad Del Producto")]
    [Required(ErrorMessage = "La Cantidad Del Producto es Obligatorio.")]
    public decimal Cantidad { get; set; }




    [Display(Name = "Foto")]
    public byte[]? Imagen { get; set; }
    public string? TipoImagen  { get; set; }
    public string? NombreImagen  { get; set; }



    [Display(Name = "Disponibilidad Del Producto")]
    [Required(ErrorMessage = "La Disponibilidad Del Producto es Obligatorio.")]
    public Disponible Disponibilidad { get; set; }


    public bool Eliminado { get; set; }


    // public virtual ICollection<DetallePedidoTemporal>? DetallePedidoTemporales { get; set; }

    // public virtual ICollection<DetallePedido>? DetallePedidos { get; set; }


    [NotMapped]
    public string? ImagenBase64  { get; set; }

// DetallePedidoTemporals
}


public enum Disponible 
{
    Disponible ,
    NoDisponible
}


