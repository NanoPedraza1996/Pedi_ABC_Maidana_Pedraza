window.onload = BuscarProductos();

function BuscarProductos() {
    $("#tbody-Productos").empty();
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

            $("#tbody-Productos").empty();
            $.each(productos, function (Index, producto) {

                let BotonDesahabilitar  = '';
                let botones = '<button type="button" onclick="BuscarProducto(' + producto.productoID + ')" class="btn btn-primary btn-sm">Editar</button>'
                    + '<button type="button" onclick="EliminarProductos(' + producto.productoID + ')" class="btn btn-primary btn-sm">Eliminar</button>'
                    + '<button type="button" class="btn btn-danger btn-sm" onclick="DesahabilitarProductos(' + producto.productoID + ', 1)">Deshabilitar</button>';
                if (producto.eliminado) {
                    BotonDesahabilitar = 'table-danger';
                    botones = '<button type="button" onclick="DesahabilitarProductos(' + producto.productoID + ', 0)" class="btn btn-success btn-sm">Habilitar</button>';
                }
                // let clase = "";
                // let celdaEditar = '<td class="text-center"><a class="btn btn-primary btn-sm" onClick="BuscarProducto(' + producto.productoID + ')" role="button">Editar</a></td>'
                // + '<td class="text-center"><a class="btn btn-primary btn-sm" onclick="EliminarProductos(' + producto.productoID + ')" role="button">Eliminar</a></td>';
                // let celdaDeshabilitar = '<td class="text-center"><a class="btn btn-danger btn-sm" onclick="DesahabilitarProductos('+ producto.productoID + ', true)" role="button">Deshabilitar</a></td>';
                // if (producto.eliminado) {
                //     clase = "table-danger" ;
                //     celdaEditar = '<td class="text-center"></td>';
                //     celdaDeshabilitar = '<td class="text-center"> <a class="btn btn-success btn-sm" onClick="DesahabilitarProductos(' + producto.productoID + ', false)" role="button">Habilitar</a></td>';
                // }

                let imagen = '<td></td>';
                if (producto.imagenBase64) {
                    imagen = '<td><img src="data:' + producto.tipoImagen + ';base64,' + producto.imagenBase64 + '" style="width: 100px;"/></td>';
                }

                // $("#tbody-Productos").append(
                //     '<tr>'
                //         // +${imagen}      ${clase}
                //         +'<td>' + '${' + producto.descripcion } + '</td>'+
                //         // +${celdaEditar}
                //         // +${celdaDeshabilitar},
                //     '</tr>'
                // );



                $("#tbody-Productos").append(
                    '<tr class=' + BotonDesahabilitar + '>'
                    + '<td>' + producto.nombre + '</td>'
                    + '<td>' + producto.descripcion + '</td>'
                    + '<td>' + producto.precio + '</td>'
                    + '<td>' + producto.cantidad + '</td>'
                    +  '<td>' + imagen + '</td>'
                    + '<td>' + producto.disponibilidad + '</td>'
                    + '<td class="text-center">' + botones + '</td>' + '</tr>');



                //    $("#tbody-categorias").empty();
                // $.each(categorias, function (Index, categoria) {
                //     //VARIABLES PARA DEFINIR BOTONES Y ESTETICA
                //     let BotonDesahabilitar = '';
                //     let botones = '<button type="button" onclick="BuscarCategoria(' + categoria.categoriaID + ')" class="btn btn-primary btn-sm" style="margin-right:5px" onkeyup="this.value = this.value.toUpperCase()">Editar</button>' +
                //         '<button type="button" onclick="EliminarCategoria(' + categoria.categoriaID + ')" class="btn btn-danger btn-sm" style="margin-right:5px">Eliminar</button>' +
                //         '<button type="button" onclick="DesahabilitarCategoria(' + categoria.categoriaID + ',1)" class="btn btn-success btn-sm">Desahabilitar</button>';
                //     if (categoria.eliminado) {
                //         BotonDesahabilitar = 'table-danger';
                //         botones = '<button type="button" onclick="DesahabilitarCategoria(' + categoria.categoriaID + ',0)" class="btn btn-warning btn-sm">Activar</button>';
                //     }

                //     $("#tbody-categorias").append('<tr class=' + BotonDesahabilitar + '>' + '<td>' + categoria.descripcion + '</td>' + '<td class="text-center">' + botones + '</td>' + '</tr>');

                // $("#tbody-categorias").append(
                //     <tr class="${clase}">
                //         ${imagen}
                //         <td>${categoria.descripcion}</td>
                //         ${celdaEditar}
                //         ${celdaDeshabilitar}
                //         </tr>
                // `);

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

function BuscarProducto(productoID) {
    $("#staticBackdropLabel").text("Editar Producto");
    // $("#ProductoID").val(productoID);
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
                $("#Imagen").val(producto.imagen);
                $("#Disponibilidad").val(producto.disponibilidad);
                $("#ProductoID").val(producto.productoID);

                $("#ModalProductos").modal("show");
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

function GuardarProductos() {
    //JAVASCRIPT
    let nombre1 = document.getElementById("Nombre").value;
    let nombre2 = $("#Nombre").val();
    let descripcion = $("#Descripcion").val();
    let precio = $("#Precio").val();
    let cantidad = $("#Cantidad").val();
    let imagen = $("#Imagen").val();
    let disponibilidad = $("#Disponibilidad").val();
    let productoID = $("#ProductoID").val();
    $.ajax({
        // la URL para la petición
        url: '../../Productos/GuardarProductos',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { productoID: productoID, nombre: nombre1, descripcion: descripcion, precio: precio, cantidad: cantidad, imagen: imagen, disponibilidad: disponibilidad },
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


function EliminarProductos(productoID, eliminado) {
    $.ajax({
        // la URL para la petición
        url: '../../Productos/EliminarProductos',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { productoID: productoID, eliminado: eliminado },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (resultado) {
            if (resultado) {
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


function DesahabilitarProductos(productoID, eliminado) {
    $.ajax({
        // la URL para la petición
        url: '../../Productos/DesahabilitarProductos',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { productoID: productoID, eliminado: eliminado },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (resultado) {
            if (resultado) {
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

$("form#files").submit(function () {
    $("#texto-error").text("");
    var formData = new FormData($(this)[0]);
    let nombre1 = document.getElementById("Nombre").value;

    var guardar = true;
    if (!nombre1) {
        $("#texto-error").text("*Debe ingresar un Nombre");
        guardar = false;
    }

    // if (guardar) {
    //     $.ajax({
    //         url: '../../Productos/GuardarProductos',
    //         type: 'POST',
    //         data: formData,
    //         async: false,
    //         success: function (resultado) {
    //             if (resultado) {
    //                 $("#ModalProductos").modal("hide");
    //                 BuscarProductos();
    //             }
    //             else {
    //                 $("#texto-error").text("Existe una Descripcion Con El mismo Nombre.");
    //             }
    //         },
    //         cache: false,
    //         contentType: false,
    //         processData: false
    //     });
    // }
    // return false;
});