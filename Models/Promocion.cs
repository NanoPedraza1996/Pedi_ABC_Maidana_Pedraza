using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pedi_ABC.Models;

public class Promocion
{
    [Key]
    public int PromocionID { get; set; }


    [Display(Name = "Nombre De La Promocion")]
    [Required(ErrorMessage = "El Nombre De La Promocion es Obligatorio.")]
    public string? Nombre { get; set; }


    [Display(Name = "Descripcion De La Promocion")]
    [Required(ErrorMessage = "La Descripcion De La Promocion es Obligatorio.")]
    public string? Descripcion { get; set; }


    [Display(Name = "Precio De La Promocion")]
    [Required(ErrorMessage = "El Precio De La Promocion es Obligatorio.")]
    public decimal Precio { get; set; }


    [Display(Name = "Cantidad De La Promocion")]
    [Required(ErrorMessage = "La Cantidad De La Promocion es Obligatorio.")]
    public decimal Cantidad { get; set; }



    [Display(Name = "Foto")]
    public byte[]? Imagen { get; set; }
    public string? TipoImagen { get; set; }
    public string? NombreImagen { get; set; }



    [Display(Name = "Disponibilidad Del Producto")]
    [Required(ErrorMessage = "La Disponibilidad Del Producto es Obligatorio.")]
    public Disponible Disponibilidad { get; set; }

    public bool Eliminado { get; set; }


    [NotMapped]
    public string? ImagenBase64  { get; set; }


    // public virtual ICollection<Pedido>? Pedidos { get; set; }

    // public virtual ICollection<DetallePedido>? DetallePedidos { get; set; }

}