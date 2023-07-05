window.onload = CargarPagina();

function CargarPagina() {
  AgregarProductoTemporal();
}


function CancelarPedido() {
  // console.log("Guardar Producto");

  // var productoID = $('#ProductoID').val();

  $.ajax({
    type: "POST",
    url: '../../Pedidos/CancelarPedido',
    data: {},
    success: function (resultado) {
      if (resultado == true) {
        // console.log("yyy?")
        // $('#ModalPedidos').modal('hide');
        // BuscarProductoTemporal();

        location.href = "../../Pedidos/Index";
      }
      // else {
      //   alert("NO SE PUDO AGREGAR EL PRODUCTO INTENTE NUEVAMENTE.");
      // }
    },
    error: function (resultado) {
      console.log("Erro debido a: " + resultado);
    }
  });
}


function AgregarProductoTemporal() {
  // console.log("Guardar Producto");

  var productoID = $('#ProductoID').val();

  $.ajax({
    type: "POST",
    url: '../../Pedidos/AgregarProductoTemporal',
    data: { ProductoID: productoID },
    success: function (resultado) {
      if (resultado == true) {
        console.log("yyy?")

        $('#ModalPedidos').modal('hide');

        BuscarProductoTemporal();

        location.href = "../../Pedidos/Create";
      }
      else {
        alert("NO SE PUDO AGREGAR EL PRODUCTO INTENTE NUEVAMENTE.");
      }
    },
    error: function (resultado) {
      console.log("Erro debido a: " + resultado);
    }
  });
}





function BuscarProductoTemporal() {
  // console.log("Buscar Producto");
  $("#tbody-Productos").empty();
  // var productoID = $('#ProductoID').val();

  $.ajax({
    type: "GET",
    url: '../../Pedidos/BuscarProductoTemporal',
    data: {},
    success: function (listadoProductoTemp) {
      // if (resultado == true) {
      //   console.log("listadoProductoTemp")
      //   $('#ModalPedidos').modal('hide');
      //   BuscarPeliTemp();
      //   location.href = "../../Pedidos/Create";
      // }
      // else {
      //   alert("NO SE PUDO AGREGAR EL PRODUCTO INTENTE NUEVAMENTE.");
      // }
      $.each(listadoProductoTemp, function (Index, producto) {
        $("#tbody-Productos").append(
          '<tr>'
          + '<th>' + producto.nombre + '</th>'
          + '<th>'
          + '<button type="button" onclick="QuitarProducto(' + producto.nombre + ')" class="btn btn-primary btn-sm">Quitar Producto</button>'
          + '</th>'
          + '</tr>');
      });
    },
    error: function (resultado) {
      console.log("Erro debido a: " + resultado);
    }
  });
}


function BuscarProducto() {
  // console.log("Buscar Producto");
  $("#tbody-Productos").empty();
  // var productoID = $('#ProductoID').val();

  $.ajax({
    type: "GET",
    url: '../../Pedidos/BuscarProducto',
    data: {},
    success: function (listadoProducto) {
      // if (resultado == true) {
      //   console.log("listadoProductoTemp")
      //   $('#ModalPedidos').modal('hide');
      //   BuscarPeliTemp();
      //   location.href = "../../Pedidos/Create";
      // }
      // else {
      //   alert("NO SE PUDO AGREGAR EL PRODUCTO INTENTE NUEVAMENTE.");
      // }
      $.each(listadoProducto, function (Index, producto) {
        $("#tbody-Productos").append(
          '<tr>'
          + '<th>' + producto.nombre + '</th>'
          + '</tr>');
      });
    },
    error: function (resultado) {
      console.log("Erro debido a: " + resultado);
    }
  });
}



function QuitarProducto(id) {
  // console.log("Guardar Quitar Producto");

  $.ajax({
    type: "POST",
    url: '../../Pedidos/QuitarProducto',
    data: { ProductoID: id },
    success: function (resultado) {
      // console.log("resultado");
      if (resultado == true) {
        // console.log("yyy?")

        // $('#ModalPedidos').modal('hide');

        // BuscarPeliTemp();

        location.href = "../../Pedidos/Create";
      }
    },
    error: function (resultado) {
      console.log("Erro debido a: " + resultado);
    }
  });
}




