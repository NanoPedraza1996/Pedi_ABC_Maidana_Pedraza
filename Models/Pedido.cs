using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pedi_ABC.Models;

public class Pedido
{
    [Key]
    public int PedidoID { get; set; }

    [Display(Name = "Direccion Del Cliente")]
    [Required(ErrorMessage = "La Direccion Del Cliente es Obligatorio.")]
    public string? Direccion { get; set; }


    [Display(Name = "Cliente")]
    public int ClienteID { get; set; }
    public virtual Cliente? Cliente { get; set; }


    [Display(Name = "Telefono Del Cliente")]
    public decimal TotalAPagar { get; set; }


    [Display(Name = "Fecha De Nacimiento.")]
    [DataType(DataType.DateTime)]
    public DateTime FechayHoraPedido { get; set; }


    [Display(Name = "Estados del Pedidos")]
    public estados EstadosPedidos { get; set; }


    public bool Eliminado { get; set; }


    [NotMapped]
    public string? ImagenBase64 { get; set; }


    public virtual ICollection<DetallePedido>? DetallePedidos { get; set; }
}


public enum estados
{
    Preparacion = 1,
    Enviado,
    Entregado,
    Cancelado

}