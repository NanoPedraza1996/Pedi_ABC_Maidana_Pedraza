using System.ComponentModel.DataAnnotations;

namespace Pedi_ABC.Models;

public class DetallePedidoTemporal
{
    [Key]
    public int DetallePedidoTemporalID { get; set; }


    public int ProductoID { get; set; }


    public int ClienteID { get; set; }
    


    // [Display(Name = "Nombre y Apellido Del Cliente")]
    public string? NombreApellido { get; set; }


    // [Display(Name = "Nombre Del Producto")]
    public string? Nombre { get; set; }


    // [Display(Name = "Precio Del Producto Unitario")]
    public decimal Precio { get; set; }
}