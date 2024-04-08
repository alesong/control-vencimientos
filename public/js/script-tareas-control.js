$(document).ready(function(){
  console.log('pasó por script-tareas-control front');
  carga_tareas();
});

function carga_tareas() {
  $("#box-tareas").html('<div class="center"><img src="img/spinner.gif"></div>')
  var div = document.getElementById('box-tareas');
  div.scrollTop = div.scrollHeight; // Esto es para que el scrol cargue abajo
  $.ajax({
      type: "GET",
      url: "../tareas",
      success: function (objeto) {
        //console.log('tareas front');
        console.log(objeto);
        $("#box-tareas").html('')
        $("#box-tareas").addClass('boxseguimientos')
        color='bg-eee';
        //x='<i class="fa fa-times orange" onclick="trashedSeguimiento('+objeto[i]['id']+')" aria-hidden="true" title="Eliminar"></i>' //Este elemento es solo una guia, es reemplazado en el siguiente for.
        const objetoIdClientes = []
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
            var vistaResuelto='</br><span class="tc-555">'+fechaResueltoFormateada+'</span> - <span class="gray f10">'+horaResueltoFormateada+'</span>';
          }else {
            var vistaResuelto='';
          }
          var vistaCreado='<span class="tc-555">'+fechaFormateada+'</span> - <span class="gray f10">'+horaFormateada+'</span>';
          //const vistaResuelto='</br><span class="tc-555">'+fechaResueltoFormateada+'</span> - <span class="gray f10">'+horaResueltoFormateada+'</span>';
          if (objeto[i]['idcliente'] == 'undefined') {
              var vistaInbox = '';
          }else {
              var vistaInbox = '<span class="tc-555">InBox:</span> <span class="pointer" aria-hidden="true" data-toggle="modal" data-target="#modalInfo" onClick="info('+objeto[i]['idcliente']+')">'+objeto[i]['nombreCliente']+'<span>';
          }

          if (fechaResueltoFormateada==undefined) {
            $('#resuelto'+objeto[i]['id']).addClass('oculto')
          }
          $("#box-tareas").append('<div id="seg'+objeto[i]['id']+'" class="mirow pl15 pr15 pt0 pb0 '+color+'"><div class="col90">'+vistaCreado+''+vistaResuelto+' <input type="checkbox" onClick="realizarTarea('+objeto[i]['id']+', '+dato+')" '+checked+' /><div class="f10 tc-green">'+vistaInbox+'</div><p class="black mt10">'+objeto[i]['seguimiento']+'</p></div><div class="col10 pointer center"><i class="fa fa-times orange" onClick="trashedSeguimiento('+objeto[i]['id']+')" aria-hidden="true" title="Eliminar"></i></div></div>')


        }
      }
    });
}


function realizarTarea(id, dato){
  campo='resuelto';
  //console.log(id);
  //console.log(dato);
if (dato == '1') {nuevoDato='0'}
if (dato == '0') {nuevoDato='1'}
console.log('el nuevo dato es: '+nuevoDato);
  $.ajax({
      type: "PUT",
      url: "../tareas",
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
        carga_tareas();
        info(idcliente);
      }
    })
}


function nuevoTarea(id_cliente){
  $("#nuevoTareaBtn").html('<div class="center"><img src="img/spinner.gif" width="15px"></div>')
  const dataSeg=$("#nuevoTareaInput").val()
  //var checkbox = document.getElementById("nuevoCheckbox");
  var valorCheckbox = true;
console.log('El valor del checkbox front es: '+valorCheckbox);
  if (dataSeg == "") {
    alert("Campos Vacios")
  }else {
    $.ajax({
        type: "POST",
        url: "../seguimientos",
        data: {id_cliente:id_cliente, dataSeg:dataSeg, checkbox:valorCheckbox},
        success: function (res) {
          if (res=='ok') {
            $("#nuevoTareaInput").val('')
            $("#nuevoTareaBtn").html('Guardar')
            info(id_cliente)
            carga_tareas()
          }else {
            alert(res)
          }
        }
      });
  }

}
