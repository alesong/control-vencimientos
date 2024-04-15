$(document).ready(function(){
  //console.log('pasó por script-notas-control front');
  carga_notas();
});

function carga_notas() {
  $("#box-notas").html('<div class="center"><img src="img/spinner.gif"></div>')
  var div = document.getElementById('box-notas');
  div.scrollTop = div.scrollHeight; // Esto es para que el scrol cargue abajo
  $.ajax({
      type: "GET",
      url: "../notas",
      success: function (objeto) {
        //console.log('notas front');
        console.log(objeto);
        $("#box-notas").html('')
        $("#box-notas").addClass('boxseguimientos')
        color='bg-eee';
        //x='<i class="fa fa-times orange" onclick="trashedSeguimiento('+objeto[i]['id']+')" aria-hidden="true" title="Eliminar"></i>' //Este elemento es solo una guia, es reemplazado en el siguiente for.
        const objetoIdClientes = []
        var cantidadResuelto = 0
        var cantidadSinResolver = 0
        var cantidadTotal = 0
        for (var i = 0; i < objeto.length; i++) {
          var fecha = new Date(objeto[i]['fecha_seguimiento']);
          var opcionesFecha = { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' };
          var opcionesHora = { hour: 'numeric', minute: 'numeric', hour12: true };
          // Convertir la fecha y hora al formato deseado
          var fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
          var horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora);
          if (objeto[i]['fechaResuelto']) {
            var fechaResuelto = new Date(objeto[i]['fechaResuelto']);
            var opcionesFechaResuelto = { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' };
            var opcionesHoraResuelto = { hour: 'numeric', minute: 'numeric', hour12: true };
            // Convertir la fecha y hora al formato deseado
            var fechaResueltoFormateada = fechaResuelto.toLocaleDateString('es-ES', opcionesFechaResuelto);
            var horaResueltoFormateada = fechaResuelto.toLocaleTimeString('es-ES', opcionesHoraResuelto);
          }
          var checked="";
          var dato=0;
          if (color=='bg-eee') {color='bg-fff'}else{color='bg-eee'}
          //console.log('el valor de resuelto es: '+objeto[i]['resuelto']);
          if (objeto[i]['resuelto'] == '1') {
            color='bg-green-lite';
            checked="checked";dato=1;
            var vistaResuelto='<span class="tc-555 oculto">'+fechaResueltoFormateada+'</span><span class="gray f10 oculto">'+horaResueltoFormateada+'</span>';
            cantidadResuelto++
          }else {
            var vistaResuelto='';
            cantidadSinResolver++
          }
          cantidadTotal++
          $('#cantidadNotas').html(cantidadSinResolver+' de '+cantidadTotal)
          var vistaCreado='<span class="tc-555 oculto">'+fechaFormateada+'</span><span class="gray f10 oculto">'+horaFormateada+'</span>';
          //const vistaResuelto='</br><span class="tc-555">'+fechaResueltoFormateada+'</span> - <span class="gray f10">'+horaResueltoFormateada+'</span>';
          if (objeto[i]['idcliente'] == 'undefined') {
              var vistaInbox = '';
          }else {
              var vistaInbox = '<span class="tc-555">InBox:</span> <span class="pointer" aria-hidden="true" data-toggle="modal" data-target="#modalInfo" onClick="info('+objeto[i]['idcliente']+')">'+objeto[i]['nombreCliente']+'<span>';
          }

          if (fechaResueltoFormateada==undefined) {
            $('#resuelto'+objeto[i]['id']).addClass('oculto')
          }
          if (objeto[i]['bg']) {
            var bgNota = objeto[i]['bg'];
          }else {
            var bgNota = '';
          }



          var btnResaltarNota = '<div class="colorBox ml10 mr10" data-miVariable="'+objeto[i]['id']+'" campo="bg" seccion="notas" title="Resaltar"></div>';
          var inputCheckNota = '<input id="checkboxNota'+objeto[i]['id']+'" type="checkbox" onClick="realizarNota('+objeto[i]['id']+', '+dato+')" '+checked+' />';
          var btnEliminatNota = '<i class="fa fa-times ml10 mr10 orange pointer" onClick="trashedNota('+objeto[i]['id']+')" aria-hidden="true" title="Eliminar"></i>';
          var vistaOPcionesNota = '<div class="mt10 absolute" style="right:30px;">'+btnResaltarNota+inputCheckNota+btnEliminatNota+'</div>';
          $("#box-notas").append('<div id="not'+objeto[i]['id']+'" class="mirow pl15 pr15 pt0 pb0 '+color+'" contextmenu="clickDerechoNota(not'+objeto[i]['id']+')"><div id="bgnot'+objeto[i]['id']+'" class="f-left" style="width:80%;background-color:'+bgNota+'">'+vistaCreado+''+vistaResuelto+' <div class="f10 tc-green">'+vistaInbox+'</div><p class="black mt10 ml15"><span class="tc-333">'+cantidadTotal+'. </span><span>'+objeto[i]['seguimiento']+'</span></p></div>'+vistaOPcionesNota+'</div>')


        }

      }
    });
}


function realizarNota(id, dato){
  campo='resuelto';
  //console.log(id);
  //console.log(dato);
if (dato == '1') {nuevoDato='0'}
if (dato == '0') {nuevoDato='1'}
console.log('el nuevo dato es: '+nuevoDato);
  $.ajax({
      type: "PUT",
      url: "../notas",
      data: {id:id,campo:campo,dato:nuevoDato},
      success: function (objeto) {
        if (objeto=='LogOut') {
          console.log("sesion cerrada");
          window.location.href = "./login";
        }
        for (var i = 0; i < objeto.length; i++) {
          if (objeto[i]['id']==id) {
            var idcliente = objeto[i]['idcliente'];
          }
        }
        carga_notas();
        info(idcliente);
      }
    })
}


function nuevoNota(id_cliente){
  $("#nuevoNotaBtn").html('<div class="center"><img src="img/spinner.gif" width="15px"></div>')
  const dataSeg=$("#nuevoNotaInput").val()
  //var checkbox = document.getElementById("nuevoCheckbox");
  var valorCheckbox = true;
console.log('El valor del checkbox front es: '+valorCheckbox);
  if (dataSeg == "") {
    alert("Campos Vacios")
  }else {
    $.ajax({
        type: "POST",
        url: "../notas",
        data: {id_cliente:id_cliente, dataSeg:dataSeg, checkbox:valorCheckbox},
        success: function (res) {
          if (res=='ok') {
            $("#nuevoNotaInput").val('')
            $("#nuevoNotaBtn").html('Guardar')
            info(id_cliente)
            carga_notas()
          }else {
            alert(res)
          }
        }
      });
  }
}


function trashedNota(id){
  $("#not"+id).css("background-color","yelow")
  $.ajax({
      type: "DELETE",
      url: "../notas",
      data: {id:id},
      success: function (res) {
        if (res=='ok') {
          $("#not"+id).css("background-color","red")
          $("#not"+id).slideUp()
        }else {
          console.log(res);
          alert('No fue posible eliminar l anota')
        }
      }
    });
}


function modificar_nota(id,campo,dato){ //esta funcion la carga el inicializarColorBoxes() desde el archivo miscript.js
console.log(id+' '+campo+' '+dato+ 'esta funcion la carga el inicializarColorBoxes() desde el archivo miscript.js' );

  $.ajax({
      type: "PUT",
      url: "../editarNotas",
      data: {id:id,campo:campo,dato:dato},
      success: function (res) {
        if (res=='LogOut') {
          console.log("sesion cerrada");
          window.location.href = "./login";
        }
        console.log(res);
        if (res=='ok' && campo=='bg') {
          console.log('ok');
          $('#bgnot'+id).css('backgroundColor',dato)
        }
      }
    })

}
