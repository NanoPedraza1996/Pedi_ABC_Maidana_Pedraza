using System.ComponentModel.DataAnnotations;

namespace Pedi_ABC.Models;

public class Cliente
{
    [Key]
    public int ClienteID { get; set; }


    [Display(Name = "Nombre y Apellido Del Cliente")]
    [Required(ErrorMessage = "El Nombre y Apellido Del Cliente es Obligatorio.")]
    public string? NombreApellido { get; set; }


    [Display(Name = "Direccion Del Cliente")]
    [Required(ErrorMessage = "La Direccion Del Cliente es Obligatorio.")]
    public string? Direccion { get; set; }


    [Display(Name = "Telefono Del Cliente")]
    [Required(ErrorMessage = "El Telefono Del Cliente es Obligatorio.")]
    public string? Telefono { get; set; }


    public bool Eliminado { get; set; }
}