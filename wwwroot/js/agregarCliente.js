window.onload = BuscarClientes();

function BuscarClientes() {
    $("#tbody-Clientes").empty();
    $.ajax({
        // la URL para la petición
        url: '../../Clientes/BuscarClientes',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: {},
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (clientes) {

            $("#tbody-Clientes").empty();
            $.each(clientes, function (Index, cliente) {
                //VARIABLES PARA DEFINIR BOTONES Y ESTETICA
                let botonDesahabilitar = '';
                let botones = '<button type="button" onclick="BuscarCliente(' + cliente.clienteID + ')" class="btn btn-primary btn-sm" style="margin-right:5px" onkeyup="this.value = this.value.toUpperCase()">Editar</button>' +
                '<button type="button" onclick="EliminarCliente(' + cliente.clienteID + ')" class="btn btn-danger btn-sm" style="margin-right:5px">Eliminar</button>' +
                '<button type="button" onclick="DesahabilitarCliente(' + cliente.clienteID + ',1)" class="btn btn-primary btn-sm">Desahabilitar</button>';
                //DEFINE SI ESTA ELIMINADA
                if (cliente.eliminar) {
                    botonDesahabilitar = 'table-danger';
                    botones = '<button type="button" onclick="DesahabilitarCliente(' + cliente.clienteID + ',0)" class="btn btn-primary btn-sm">Activar</button>';
                }
                
                $("#tbody-Clientes").append('<tr class=' + botonDesahabilitar + '>' 
                + '<td>' + cliente.nombreApellido + '</td>' 
                + '<td>' + cliente.direccion + '</td>' 
                + '<td>' + cliente.telefono + '</td>'
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





function BuscarCliente(clienteID) {
    $("#staticBackdropLabel").text("Editar Servicio");
    $("#ClienteID").val(clienteID);
    $.ajax({
        // la URL para la petición
        url: '../../Clientes/BuscarClientes',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { clienteID: clienteID },
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (clientes) {

            if (clientes.length == 1) {
                let cliente = clientes[0];
                $("#NombreApellido").val(cliente.nombreApellido);
                $("#Direccion").val(cliente.direccion);
                $("#Telefono").val(cliente.telefono);

                $("#ModalCliente").modal("show");
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
    $("#NombreApellido").val('');
    $("#Direccion").val('');
    $("#Telefono").val('');
}


function GuardarCliente() {
    //JAVASCRIPT
    let nombreApellido1 = document.getElementById("NombreApellido").value;
    let nombreApellido2 = $("#NombreApellido").val();
    let direccion = $("#Direccion").val();
    let telefono = $("#Telefono").val();
    let clienteID = $("#ClienteID").val();
    $.ajax({
        // la URL para la petición
        url: '../../Clientes/GuardarCliente',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { clienteID: clienteID, nombreApellido: nombreApellido1, direccion: direccion, telefono: telefono },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (resultado) {
            if (resultado) {
                $("#ModalCliente").modal("hide");
                BuscarClientes();
            }
            else {
                alert("Existe un Clinte con El Mismo Nombre y Apellido.");
            }
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        }
    });
}


function EliminarCliente(clienteID, eliminado) {
    $.ajax({
        // la URL para la petición
        url: '../../Clientes/EliminarCliente',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { clienteID: clienteID, eliminado: eliminado },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (resultado) {
            if (resultado) {
                BuscarClientes();

            }
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        }

    });

}


function DesahabilitarCliente(clienteID, eliminado) {
    $.ajax({
        // la URL para la petición
        url: '../../Clientes/DesahabilitarCliente',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { clienteID: clienteID, eliminado: eliminado },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (resultado) {
            if (resultado) {
                BuscarClientes();

            }
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        }

    });

}