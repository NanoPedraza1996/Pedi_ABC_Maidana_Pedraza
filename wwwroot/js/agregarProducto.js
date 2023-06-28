window.onload = BuscarProductos();

function BuscarProductos() {
    $("#tbody-Producto").empty();
    $.ajax({
        // la URL para la petición
        url: '../../Productos/BuscarProductos',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: {},
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (productos) {

            $("#tbody-Producto").empty();
            $.each(productos, function (Index, producto) {
                //VARIABLES PARA DEFINIR BOTONES Y ESTETICA
                let BotonDesahabilitar = '';
                let botones = '<button type="button" onclick="BuscarCliente(' + producto.productoID + ')" class="btn btn-primary btn-sm" style="margin-right:5px" onkeyup="this.value = this.value.toUpperCase()">Editar</button>' +
                '<button type="button" onclick="EliminarCliente(' + producto.productoID + ')" class="btn btn-danger btn-sm" style="margin-right:5px">Eliminar</button>' +
                '<button type="button" onclick="DesahabilitarCliente(' + producto.productoID + ',1)" class="btn btn-danger btn-sm">Desahabilitar</button>';
                //DEFINE SI ESTA ELIMINADA
                if (producto.eliminar) {
                    BotonDesahabilitar = 'table-danger';
                    botones = '<button type="button" onclick="DesahabilitarCliente(' + producto.productoID + ',0)" class="btn btn-warning btn-sm">Activar</button>';
                }
                
                $("#tbody-Clientes").append('<tr class=' + BotonDesahabilitar + ' "tr">' 
                + '<td class="yellow">' + producto.nombre + '</td>' 
                + '<td>' + producto.descripcion + '</td>' 
                + '<td>' + producto.precio + '</td>'
                + '<td>' + producto.Cantidad + '</td>'
                + '<td>' + producto.Foto + '</td>'
                + '<td>' + producto.Disponible + '</td>'
                + '<td class="text-center">' + botones + '</td>' + '</tr>');
           
          

            });


        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            alert('Error al cargar categorias');
        },

        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}

function BuscarProducto(productoID) {
    $.ajax({
        // la URL para la petición
        url: '../../Productos/BuscarProductos',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { productoID: productoID },
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (productos) {

            if (categorias.length == 1) {
                let producto = productos[0];
                $("#Nombre").val(producto.nombre);
                $("#Descripcion").val(producto.descripcion);
                $("#Precio").val(producto.precio);
                $("#Cantidad").val(producto.cantidad);
                $("#Foto").val(producto.foto);
                $("#Disponible").val(producto.disponible);
                $("#Telefono").val(producto.telefono);

                $("#ModalProducto").modal("show");
            }
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            alert('Error al cargar Clientes');
        },

        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}


function VaciarFormulario() {
    $("#Nombre").val('');
    $("#Descripcion").val('');
    $("#Precio").val('');
    $("#Cantidad").val('');
    $("#Foto").val('');
    $("#TipoDeImagen").val('');
    $("#NombreDeImagen").val('');
    $("#Precio").val('');
    
}


// function GuardarProducto() {
//     //JAVASCRIPT
//     let nombreApellido1 = document.getElementById("NombreApellido").value;
//     let nombreApellido2 = $("#NombreApellido").val();
//     let direccion = $("#Direccion").val();
//     let telefono = $("#Telefono").val();
//     let clienteID = $("#ClienteID").val();
//     $.ajax({
//         // la URL para la petición
//         url: '../../Clientes/GuardarCliente',
//         // la información a enviar
//         // (también es posible utilizar una cadena de datos)
//         data: { clienteID: clienteID, nombreApellido: nombreApellido1, direccion: direccion, telefono: telefono },
//         // especifica si será una petición POST o GET
//         type: 'POST',
//         // el tipo de información que se espera de respuesta
//         dataType: 'json',
//         // código a ejecutar si la petición es satisfactoria;
//         // la respuesta es pasada como argumento a la función
//         success: function (resultado) {
//             if (resultado) {
//                 $("#ModalCliente").modal("hide");
//                 BuscarClientes();
//             }
//             else {
//                 alert("Existe un Clinte con El Mismo Nombre y Apellido.");
//             }
//         },

//         // código a ejecutar si la petición falla;
//         // son pasados como argumentos a la función
//         // el objeto de la petición en crudo y código de estatus de la petición
//         error: function (xhr, status) {
//             alert('Disculpe, existió un problema');
//         }
//     });
// }