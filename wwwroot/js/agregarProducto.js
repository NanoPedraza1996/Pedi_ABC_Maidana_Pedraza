window.onload = BuscarProductos();


// function BuscarProductos() {
//     $("#tbody-Producto").empty();
//     $.ajax({
//         // la URL para la petición
//         url: '../../Productos/BuscarProductos',
//         // la información a enviar
//         // (también es posible utilizar una cadena de datos)
//         data: {},
//         // especifica si será una petición POST o GET
//         type: 'GET',
//         // el tipo de información que se espera de respuesta
//         dataType: 'json',
//         // código a ejecutar si la petición es satisfactoria;
//         // la respuesta es pasada como argumento a la función
//         success: function (productos) {

//             $("#tbody-Producto").empty();
//             $.each(productos, function (index, producto) {

//                 let clase = "";
//                 let celdaEditar = '<td class="text-center"> <a class="btn btn-primary btn-sm" onClick="BuscarProducto(${producto.productoID})" role="button">Editar</a></td>';
//                 let celdaDeshabilitar = '<td class="text-center"> <a class="btn btn-danger btn-sm" onClick="DeshabilitarHabilitar(${producto.productoID}, true)" role="button">Deshabilitar</a></td>';
//                 if (producto.eliminado) {
//                     clase = "table-danger";
//                     celdaEditar = '<td class="text-center"></td>;'
//                     celdaDeshabilitar = '<td class="text-center"> <a class="btn btn-success btn-sm" onClick="DeshabilitarHabilitar(${producto.productoID}, false)" role="button">Habilitar</a></td>';
//                 }

//                 let imagen = '<td></td>';
//                 if (producto.imagenBase64) {
//                     imagen = '<td><img src="data:${categoria.tipoImagen};base64, ${categoria.imagenBase64}" style="width: 100px;" /></td>';
//                 }

//                 $("#tbody-categorias").append(
//                     + '<tr class="${clase}">'
//                     + '${imagen}'
//                     + '<td>${producto.nombre}</td>'
//                     + '<td>${producto.descripcion}</td>'
//                     + '<td>${producto.precio}</td>'
//                     + '<td>${producto.cantidad}</td>'
//                     + '<td>${producto.foto}</td>'
//                     + '<td>${producto.disponible}</td>'
//                     + '${celdaEditar}'
//                     + '${celdaDeshabilitar}'
//                     + '</tr>'
//                 );
//             });
//         },

//         // código a ejecutar si la petición falla;
//         // son pasados como argumentos a la función
//         // el objeto de la petición en crudo y código de estatus de la petición
//         error: function (xhr, status) {
//             alert('Error al cargar categorias');
//         },
//         // código a ejecutar sin importar si la petición falló o no
//         complete: function (xhr, status) {
//             //alert('Petición realizada');
//         }
//     });
// }
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
                let botonDesahabilitar = '';
                let botones = '<button type="button" onclick="BuscarCliente(' + producto.productoID + ')" class="btn btn-primary btn-sm" style="margin-right:5px" onkeyup="this.value = this.value.toUpperCase()">Editar</button>'
                    + '<button type="button" onclick="EliminarCliente(' + producto.productoID + ')" class="btn btn-danger btn-sm" style="margin-right:5px">Eliminar</button>'
                    + '<button type="button" onclick="DesahabilitarCliente(' + producto.productoID + ',1)" class="btn btn-danger btn-sm">Desahabilitar</button>';
                //DEFINE SI ESTA ELIMINADA
                if (producto.eliminado) {

                    botonDesahabilitar = 'table-danger';
                    botones = '<button type="button" onclick="DesahabilitarCliente(' + producto.productoID + ',0)" class="btn btn-warning btn-sm">Activar</button>';
                }

                $("#tbody-Producto").append('<tr class=' + botonDesahabilitar + ' "tr">'
                    + '<td>' + producto.nombre + '</td>'
                    + '<td>' + producto.descripcion + '</td>'
                    + '<td>' + producto.precio + '</td>'
                    + '<td>' + producto.cantidad + '</td>'
                    + '<td>' + producto.disponible + '</td>'
                    + '<td class="text-center">' + botones + '</td>' + '</tr>'
                );
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

            if (productos.length == 1) {
                let producto = productos[0];
                $("#Nombre").val(producto.nombre);
                $("#Descripcion").val(producto.descripcion);
                $("#Precio").val(producto.precio);
                $("#Cantidad").val(producto.cantidad);
                $("#Disponible").val(producto.disponible);

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
    $("#Disponible").val('');

}

// foto: foto,

function GuardarProducto() {
    //JAVASCRIPT
    let nombre1 = document.getElementById("Nombre").value;
    let nombre2 = $("#Nombre").val();
    let descripcion = $("#Descripcion").val();
    let precio = $("#Precio").val();
    let cantidad = $("#Cantidad").val();
    let disponible = $("#Disponible").val();
    let productoID = $("#ProductoID").val();
    $.ajax({
        // la URL para la petición
        url: '../../Productos/GuardarProducto',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { productoID: productoID, nombre: nombre1, descripcion: descripcion, precio: precio, cantidad: cantidad, disponible: disponible },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (resultado) {
            if (resultado) {
                $("#ModalProducto").modal("hide");
                BuscarProductos();
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
//             url: '../../Productos/GuardarProducto',
//             type: 'POST',
//             data: formData,
//             async: false,
//             success: function (resultado) {
//                 if (resultado) {
//                     $("#ModalProducto").modal("hide");
//                     BuscarProductos();
//                 }
//                 else {
//                     $("#texto-error").text("Existe un Producto Con El mismo Nombre.");
//                 }
//             },
//             cache: false,
//             contentType: false,
//             processData: false
//         });
//     }
//     return false;
// });