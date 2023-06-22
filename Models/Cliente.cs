using System.ComponentModel.DataAnnotations;

namespace ProyectoFinal.Models;
public class Cliente
{
    [Key]
    public int ClienteID { get; set; }

    public string? NombreApellido { get; set; }

    public string? Direccion { get; set; }
    
    public string? Telefono { get; set; }

    public bool Eliminado { get; set; }


    // public virtual ICollection<Pedido>? Pedidos { get; set; }

    // public virtual ICollection<DetallePedido>? DetallePedidos { get; set; }
}