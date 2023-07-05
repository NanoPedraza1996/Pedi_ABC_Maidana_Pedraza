window.onload = BuscarPromociones();

function BuscarPromociones() {
    $("#tbody-Promociones").empty();
    $.ajax({
        // la URL para la petición
        url: '../../Promociones/BuscarPromociones',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: {},
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (promociones) {

            $("#tbody-Promociones").empty();
            $.each(promociones, function (Index, promocion) {

                let BotonDesahabilitar = '';
                let botones = '<button type="button" onclick="BuscarPromocion(' + promocion.promocionID + ')" class="btn btn-primary btn-sm">Editar</button>'
                    + '<button type="button" onclick="EliminarPromociones(' + promocion.promocionID + ')" class="btn btn-primary btn-sm">Eliminar</button>'
                    + '<button type="button" class="btn btn-danger btn-sm" onclick="DesahabilitarPromociones(' + promocion.promocionID + ', 1)">Deshabilitar</button>';
                if (promocion.eliminado) {
                    BotonDesahabilitar = 'table-danger';
                    botones = '<button type="button" onclick="DesahabilitarPromociones(' + promocion.promocionID + ', 0)" class="btn btn-success btn-sm">Habilitar</button>';
                }

                let imagen = '';
                if (promocion.imagenBase64) {
                    imagen = '<img src="data:' + promocion.tipoImagen + ';base64,' + promocion.imagenBase64 + '" style="width: 100px;" class="rounded-circle"/>';
                }

                $("#tbody-Promociones").append(
                    '<tr class=' + BotonDesahabilitar + '>'
                    + '<td>' + promocion.nombre + '</td>'
                    + '<td>' + promocion.descripcion + '</td>'
                    + '<td>' + promocion.precio + '</td>'
                    + '<td>' + promocion.cantidad + '</td>'
                    + '<td>' + imagen + '</td>'
                    + '<td>' + promocion.disponibilidad + '</td>'
                    + '<td class="text-center">' + botones + '</td>' + '</tr>');





            });
        },



        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            alert('Error al cargar Productos');
        },
        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}

function BuscarPromocion(promocionID) {
    $("#staticBackdropLabel").text("Editar Promocion");
    $("#PromocionID").val(promocionID);
    $.ajax({
        // la URL para la petición
        url: '../../Promociones/BuscarPromociones',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { promocionID: promocionID },
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (promociones) {

            if (promociones.length == 1) {
                let promocion = promociones[0];
                $("#Nombre").val(promocion.nombre);
                $("#Descripcion").val(promocion.descripcion);
                $("#Precio").val(promocion.precio);
                $("#Cantidad").val(promocion.cantidad);
                $("#Imagen").val(promocion.imagen);
                $("#Disponibilidad").val(promocion.disponibilidad);
                $("#promocionID").val(promocion.promocionID);

                $("#ModalPromociones").modal("show");
            }
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            alert('Error al cargar Pedidos');
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
    $("#Imagen").val('');
    $("#Disponibilidad").val('');

}


function GuardarPromociones() {
    //JAVASCRIPT
    let nombre1 = document.getElementById("Nombre").value;
    let nombre2 = $("#Nombre").val();
    let descripcion = $("#Descripcion").val();
    let precio = $("#Precio").val();
    let cantidad = $("#Cantidad").val();
    let imagen = $("#Imagen").val();
    let disponibilidad = $("#Disponibilidad").val();
    let promocionID = $("#PromocionID").val();
    $.ajax({
        // la URL para la petición
        url: '../../Promociones/GuardarPromociones',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { promocionID: promocionID, nombre: nombre1, descripcion: descripcion, precio: precio, cantidad: cantidad, imagen: imagen, disponibilidad: disponibilidad },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (resultado) {
            if (resultado) {
                $("#ModalPromociones").modal("hide");
                BuscarPromociones();
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

function EliminarPromociones(promocionID, eliminado) {
    $.ajax({
        // la URL para la petición
        url: '../../Promociones/EliminarPromociones',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { promocionID: promocionID, eliminado: eliminado },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (resultado) {
            if (resultado) {
                BuscarPromociones();

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


function DesahabilitarPromociones(promocionID, eliminado) {
    $.ajax({
        // la URL para la petición
        url: '../../Promociones/DesahabilitarPromociones',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { promocionID: promocionID, eliminado: eliminado },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (resultado) {
            if (resultado) {
                BuscarPromociones();

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

// $("form#files").submit(function () {
//     $("#texto-error").text("");
//     var formData = new FormData($(this)[0]);
//     let nombre1 = document.getElementById("Nombre").value;

//     var guardar = true;
//     if (!nombre1) {
//         $("#texto-error").text("*Debe ingresar un Nombre");
//         guardar = false;
//     }

//     if (guardar) {
//         $.ajax({
//             url: '../../Promociones/GuardarPromociones',
//             type: 'POST',
//             data: formData,
//             async: false,
//             success: function (resultado) {
//                 if (resultado) {
//                     $("#ModalPromociones").modal("hide");
//                     BuscarPromociones();
//                 }
//                 else {
//                     $("#texto-error").text("Existe una Descripcion Con El mismo Nombre.");
//                 }
//             },
//             cache: false,
//             contentType: false,
//             processData: false
//         });
//     }
//     return false;
// });