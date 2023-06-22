using System.ComponentModel.DataAnnotations;

namespace ProyectoFinal.Models;

public class Producto
{
    [Key]
    public int ProductoID { get; set; }

    public string? Nombre { get; set; }

    public string? Descripcion { get; set; }

    public string? Precio { get; set; }

    public int Cantidad { get; set; }

    public byte[]? Foto { get; set; }
    public string? TipoDeImagen { get; set; }
    public string? NombreDeImagen { get; set; }

    public Disponibilidad Disponible { get; set; }

    public bool Eliminado { get; set; }



    // public virtual ICollection<Pedido>? Pedidos { get; set; }

    // public virtual ICollection<DetallePedido>? DetallePedidos { get; set; }
}