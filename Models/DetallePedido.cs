using System.ComponentModel.DataAnnotations;

namespace Pedi_ABC.Models;

public class DetallePedido
{
    [Key]
    public int DetallePedidoID { get; set; }


    [Display(Name = "Pedido")]
    public int PedidoID { get; set; }
    public virtual Pedido? Pedido { get; set; }



    [Display(Name = "Producto")]
    public int ProductoID { get; set; }
    public virtual Producto? Producto { get; set; }
    

    [Display(Name = "Nombre Del Producto")]
    public string? Nombre { get; set; }


    [Display(Name = "Cantidad Del Pedido")]
    [Required(ErrorMessage = "La Cantidad Del Pedido es Obligatorio.")]
    public decimal Cantidad { get; set; }


    [Display(Name = "Precio Unitario Del Producto")]
    // [Required(ErrorMessage = "El Nombre Del Producto es Obligatorio.")]
    public decimal PrecioUnitario { get; set; }


    public bool Eliminado { get; set; }


}