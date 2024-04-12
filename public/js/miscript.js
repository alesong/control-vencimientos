$(document).ready(function(){
  console.log('jQuery incluído');
  carga_control();
});
$('body').fadeIn(2000);
$("#fecha_busqueda").change(function(){
  carga_control();
});

function carga_control(){
  $("#Buscar").val('');
  $(".tabla-control").html('<tr><td colspan="8" class="center"><img src="img/spinner.gif" class="imgspin oculto" /></td></tr>');
  $(".imgspin").slideDown(250);
  var mes_actual  = new Date().toLocaleDateString('es-es', {month:"short"})
  const filtro = $("#fecha_busqueda").val();
  $('.btnmes').removeClass('bb3');$('.btnmes').removeClass('bg-crema2');
  $('#btn'+filtro).addClass('bb3');$('#btn'+filtro).addClass('bg-crema2')
  setTimeout(function(){
    if (filtro=='') {
      var parametro = '/'+mes_actual
      $("#fecha_busqueda").val(mes_actual);
    }else {
      var parametro = '/'+filtro
    }
    $(".titu-fecha").html(parametro)
    console.log(parametro);
  $.ajax({
      type: "GET",
      url: "../control"+parametro,
      success: function (objeto) {

        if (objeto=='LogOut') {
          console.log("sesion cerrada");
          window.location.href = "./login";
        }

        $(".tabla-control").html('');
        $(".tabla-nuevos").html('');

        objeto.sort((a, b) => {  //ordena el arreglo por fecha
          //var day = new Date(objeto.fecha).toLocaleDateString('es-es', { day:"numeric"})
          if (a.fecha < b.fecha) {
            return -1
          }
          if (a.fecha > b.fecha) {
            return 1
          }
          return 0
        })
        console.log(objeto);
        var filas = objeto.length;

        if (filas==0) {
          console.log('Objeto vacío');
          $(".tabla-control").append('Objeto vacío');
          }else {
            var n=0;
            var viejos = 0;
            var nuevos = 0;
            while (n < filas) {
              if (objeto[n]["fecha"]!='') {
                //console.log(objeto[n]["fecha"]);
                var fecha  = new Date(objeto[n]["fecha"]).toLocaleDateString('es-la', { year:"numeric", month:"short"})
                var ano  = new Date(objeto[n]["fecha"]).toLocaleDateString('es-la', { year:"numeric"})
                var mes  = new Date(objeto[n]["fecha"]).toLocaleDateString('es-la', { month:"numeric"})
                var dia = new Date(objeto[n]["fecha"]).toLocaleDateString('es-la', { day:"numeric"})
                var id = objeto[n]['id']
                var spinner = '<img src="img/spinner.gif" class="spinner_celdas oculto spinner_'+id+'">'
                var input_fecha_hidden = '<div id="box-fecha-'+id+'" class="mirow -mt15 oculto"><div class="col70"><input type="date" id="input_'+id+'_fecha" class="b0 center" value="'+ano+'-'+mes+'-'+dia+'" style="width:115px;float:left;"></div><div class="col30"><img src="img/save.png"style="height:15px;cursor:pointer;" onClick="modificar_control('+id+',`fecha`)"/></div></div>'
                var input_fecha = '<input id="input_a_'+id+'_fecha" type="text" class="b0 center" value="'+dia+'" onClick="change_type('+id+',`fecha`,'+ano+','+mes+','+dia+')" style="max-width:20px;min-width:15px;>'+spinner;
                var input_nombre = '<input id="input_'+id+'_nombre" type="text" class="b0 img100" value="'+objeto[n]["nombre"]+'" onChange="modificar_control('+id+',`nombre`)" style="max-width:400px;min-width:100px;>'+spinner;
                var input_ramo = '<input id="input_'+id+'_ramo" type="text" class="b0 img100 center" value="'+objeto[n]["ramo"]+'" onChange="modificar_control('+id+',`ramo`)" style="max-width:40px;min-width:80px;>'+spinner;
                var input_cia = '<input id="input_'+id+'_cia" type="text" class="b0 img100" value="'+objeto[n]["cia"]+'" onChange="modificar_control('+id+',`cia`)" style="max-width:40px;min-width:80px;>'+spinner;
                var input_descripcion = '<input id="input_'+id+'_descripcion" type="text" class="b0 img100" value="'+objeto[n]["descripcion"]+'" onChange="modificar_control('+id+',`descripcion`)" style="max-width:800px;min-width:200px;>'+spinner;
                var input_observaciones = '<input id="input_'+id+'_observaciones" type="text" class="b0 img100" value="'+objeto[n]["observaciones"]+'" onChange="modificar_control('+id+',`observaciones`)" style="max-width:800px;min-width:200px;>'+spinner;

                if (objeto[n]["renovacion"]==1) {
                  var renovacion='<i id="i_renovacion_'+id+'" onclick="modificar_control('+id+', `renovacion`)" class="fa fa-file-text green" aria-hidden="true" title="Renovación descargada" bit="1"></i>'
                  var input_renovacion = '<input id="input_'+id+'_renovacion" type="hidden" value="0">'
                }else {
                  var renovacion='<i id="i_renovacion_'+id+'" onclick="modificar_control('+id+', `renovacion`)" class="fa fa-file-text-o tc-bbb" aria-hidden="true" title="Sin renovación" bit="1"></i>'
                  var input_renovacion = '<input id="input_'+id+'_renovacion" type="hidden" value="1">'
                }
                if (objeto[n]["estudio"]==1) {
                  var estudio='<i id="i_estudio_'+id+'" onclick="modificar_control('+id+', `estudio`)" class="fa fa-bar-chart green" aria-hidden="true" title="Estudio realizado"></i>'
                  var input_estudio = '<input id="input_'+id+'_estudio" type="hidden" value="0">'
                }else {
                  var estudio='<i id="i_estudio_'+id+'" onclick="modificar_control('+id+', `estudio`)" class="fa fa-bar-chart tc-bbb" aria-hidden="true" title="Sin reallizar estudio"></i>'
                  var input_estudio = '<input id="input_'+id+'_estudio" type="hidden" value="1">'
                }
                if (objeto[n]["financiacion"]==1) {
                  var financiacion='<i id="i_financiacion_'+id+'" onclick="modificar_control('+id+', `financiacion`)" class="fa fa-handshake-o green" aria-hidden="true" title="Financiación realizada"></i>'
                  var input_financiacion = '<input id="input_'+id+'_financiacion" type="hidden" value="0">'
                }else {
                  var financiacion='<i id="i_financiacion_'+id+'" onclick="modificar_control('+id+', `financiacion`)" class="fa fa-handshake-o tc-bbb" aria-hidden="true" title="Sin realizar financiación"></i>'
                  var input_financiacion = '<input id="input_'+id+'_financiacion" type="hidden" value="1">'
                }
                if (objeto[n]["correo"]==1) {
                  var correo='<i id="i_correo_'+id+'" onclick="modificar_control('+id+', `correo`)" class="fa fa-envelope green" aria-hidden="true" value="0" title="Correo enviado"></i>'
                  var input_correo = '<input id="input_'+id+'_correo" type="hidden" value="0">'
                }else {
                  var correo='<i id="i_correo_'+id+'" onclick="modificar_control('+id+', `correo`)" class="fa fa-envelope-o tc-bbb" aria-hidden="true" value="1" title="Correo no enviado"></i>'
                  var input_correo = '<input id="input_'+id+'_correo" type="hidden" value="1">'
                }
                if (objeto[n]["pago"]==1) {
                  var pago='<i id="i_pago_'+id+'" onclick="modificar_control('+id+', `pago`)" class="fa fa-usd green" aria-hidden="true" value="0" title="Pago realizado"></i>'
                  var input_pago = '<input id="input_'+id+'_pago" type="hidden" value="0">'
                }else {
                  var pago='<i id="i_pago_'+id+'" onclick="modificar_control('+id+', `pago`)" class="fa fa-usd tc-bbb" aria-hidden="true" value="1" title="Sin pago"></i>'
                  var input_pago = '<input id="input_'+id+'_pago" type="hidden" value="1">'
                }
                if (objeto[n]["tp"]==1) {
                  var tp='<i id="i_tp_'+id+'" onclick="modificar_control('+id+', `tp`)" class="fa fa-id-card green" aria-hidden="true" value="0" title="Con tarjeta de propiedad"></i>'
                  var input_tp = '<input id="input_'+id+'_tp" type="hidden" value="0">'
                }else {
                  var tp='<i id="i_tp_'+id+'" onclick="modificar_control('+id+', `tp`)" class="fa fa-id-card-o tc-bbb" aria-hidden="true" value="1" title="Sin tarjeta de propiedad"></i>'
                  var input_tp = '<input id="input_'+id+'_tp" type="hidden" value="1">'
                }
                var td_estado = renovacion+' '+estudio+' '+financiacion+' '+correo+' '+pago+' '+tp+' '+spinner+' '+input_renovacion+' '+input_estudio+' '+input_financiacion+' '+input_correo+' '+input_pago+' '+input_tp;
                var td_opciones = '<td class="td-opciones"><div class="colorBox" data-miVariable="'+id+'" campo="bg"></div><i class="fa fa-info-circle blueviolet pointer f16 ml10 mr10" aria-hidden="true" data-toggle="modal" data-target="#modalInfo" onClick="info('+id+')"></i> <i id="trash_'+id+'" class="fa fa-trash-o red pointer" aria-hidden="true" onClick="trash('+id+')"></i></td>'
                var vista = '<tr id="tr_'+id+'" class="cn" style="background-color:'+objeto[n]["bg"]+'"><td>'+input_fecha+input_fecha_hidden+'</td><td>'+input_nombre+'</td><td>'+input_ramo+'</td><td>'+input_cia+'</td><td>'+input_descripcion+'</td><td>'+input_observaciones+'</td><td>'+td_estado+'</td>'+td_opciones+'</tr>'
                $(".tabla-control").append(vista);
                viejos++;
              }
              if (objeto[n]["fecha"]=='' || objeto[n]["fecha"]=='undefined') {
                var id = objeto[n]['id']
                var spinner = '<img src="img/spinner.gif" class="spinner_celdas oculto spinner_'+id+'">'
                var input_fecha_hidden = '<div id="box-fecha-'+id+'" class="mirow -mt15 oculto"><div class="col70"><input type="date" id="input_'+id+'_fecha" class="b0 center" value="'+ano+'-'+mes+'-'+dia+'" style="width:115px;float:left;"></div><div class="col30"><img src="img/save.png"style="height:15px;cursor:pointer;" onClick="modificar_control('+id+',`fecha`)"/></div></div>'
                var input_fecha = '<input id="input_a_'+id+'_fecha" type="text" class="b0 center" value="'+dia+'" onClick="change_type('+id+',`fecha`,'+ano+','+mes+','+dia+')" style="max-width:20px;min-width:15px;>'+spinner;
                var input_nombre = '<input id="input_'+id+'_nombre" type="text" class="b0 img100" value="'+objeto[n]["nombre"]+'" onChange="modificar_control('+id+',`nombre`)" style="max-width:400px;min-width:100px;>'+spinner;
                var input_ramo = '<input id="input_'+id+'_ramo" type="text" class="b0 img100 center" value="'+objeto[n]["ramo"]+'" onChange="modificar_control('+id+',`ramo`)" style="max-width:40px;min-width:80px;>'+spinner;
                var input_cia = '<input id="input_'+id+'_cia" type="text" class="b0 img100" value="'+objeto[n]["cia"]+'" onChange="modificar_control('+id+',`cia`)" style="max-width:40px;min-width:80px;>'+spinner;
                var input_descripcion = '<input id="input_'+id+'_descripcion" type="text" class="b0 img100" value="'+objeto[n]["descripcion"]+'" onChange="modificar_control('+id+',`descripcion`)" style="max-width:800px;min-width:200px;>'+spinner;
                var input_observaciones = '<input id="input_'+id+'_observaciones" type="text" class="b0 img100" value="'+objeto[n]["observaciones"]+'" onChange="modificar_control('+id+',`observaciones`)" style="max-width:800px;min-width:200px;>'+spinner;

                if (objeto[n]["renovacion"]==1) {
                  var renovacion='<i id="i_renovacion_'+id+'" onclick="modificar_control('+id+', `renovacion`)" class="fa fa-file-text green" aria-hidden="true" bit="1"></i>'
                  var input_renovacion = '<input id="input_'+id+'_renovacion" type="hidden" value="0">'
                }else {
                  var renovacion='<i id="i_renovacion_'+id+'" onclick="modificar_control('+id+', `renovacion`)" class="fa fa-file-text-o tc-bbb" aria-hidden="true" bit="1"></i>'
                  var input_renovacion = '<input id="input_'+id+'_renovacion" type="hidden" value="1">'
                }
                if (objeto[n]["estudio"]==1) {
                  var estudio='<i id="i_estudio_'+id+'" onclick="modificar_control('+id+', `estudio`)" class="fa fa-bar-chart green" aria-hidden="true"></i>'
                  var input_estudio = '<input id="input_'+id+'_estudio" type="hidden" value="0">'
                }else {
                  var estudio='<i id="i_estudio_'+id+'" onclick="modificar_control('+id+', `estudio`)" class="fa fa-bar-chart tc-bbb" aria-hidden="true"></i>'
                  var input_estudio = '<input id="input_'+id+'_estudio" type="hidden" value="1">'
                }
                if (objeto[n]["financiacion"]==1) {
                  var financiacion='<i id="i_financiacion_'+id+'" onclick="modificar_control('+id+', `financiacion`)" class="fa fa-handshake-o green" aria-hidden="true"></i>'
                  var input_financiacion = '<input id="input_'+id+'_financiacion" type="hidden" value="0">'
                }else {
                  var financiacion='<i id="i_financiacion_'+id+'" onclick="modificar_control('+id+', `financiacion`)" class="fa fa-handshake-o tc-bbb" aria-hidden="true"></i>'
                  var input_financiacion = '<input id="input_'+id+'_financiacion" type="hidden" value="1">'
                }
                if (objeto[n]["correo"]==1) {
                  var correo='<i id="i_correo_'+id+'" onclick="modificar_control('+id+', `correo`)" class="fa fa-envelope green" aria-hidden="true" value="0"></i>'
                  var input_correo = '<input id="input_'+id+'_correo" type="hidden" value="0">'
                }else {
                  var correo='<i id="i_correo_'+id+'" onclick="modificar_control('+id+', `correo`)" class="fa fa-envelope-o tc-bbb" aria-hidden="true" value="1"></i>'
                  var input_correo = '<input id="input_'+id+'_correo" type="hidden" value="1">'
                }
                if (objeto[n]["pago"]==1) {
                  var pago='<i id="i_pago_'+id+'" onclick="modificar_control('+id+', `pago`)" class="fa fa-usd green" aria-hidden="true" value="0"></i>'
                  var input_pago = '<input id="input_'+id+'_pago" type="hidden" value="0">'
                }else {
                  var pago='<i id="i_pago_'+id+'" onclick="modificar_control('+id+', `pago`)" class="fa fa-usd tc-bbb" aria-hidden="true" value="1"></i>'
                  var input_pago = '<input id="input_'+id+'_pago" type="hidden" value="1">'
                }
                if (objeto[n]["tp"]==1) {
                  var tp='<i id="i_tp_'+id+'" onclick="modificar_control('+id+', `tp`)" class="fa fa-id-card green" aria-hidden="true" value="0"></i>'
                  var input_tp = '<input id="input_'+id+'_tp" type="hidden" value="0">'
                }else {
                  var tp='<i id="i_tp_'+id+'" onclick="modificar_control('+id+', `tp`)" class="fa fa-id-card-o tc-bbb" aria-hidden="true" value="1"></i>'
                  var input_tp = '<input id="input_'+id+'_tp" type="hidden" value="1">'
                }
                var td_estado = renovacion+' '+estudio+' '+financiacion+' '+correo+' '+pago+' '+tp+' '+spinner+' '+input_renovacion+' '+input_estudio+' '+input_financiacion+' '+input_correo+' '+input_pago+' '+input_tp;
                var td_opciones = '<td class="td-opciones"><div class="colorBox" data-miVariable="'+id+'" campo="bg"></div><i class="fa fa-info-circle blueviolet pointer f16 ml10 mr10" aria-hidden="true" data-toggle="modal" data-target="#modalInfo" onClick="info('+id+')"></i> <i id="trash_'+id+'" class="fa fa-trash-o red pointer" aria-hidden="true" onClick="trash('+id+')"></i></td>'
                var vista = '<tr class="cn"><td>'+input_fecha+input_fecha_hidden+'</td><td>'+input_nombre+'</td><td>'+input_ramo+'</td><td>'+input_cia+'</td><td>'+input_descripcion+'</td><td>'+input_observaciones+'</td><td>'+td_estado+'</td>'+td_opciones+'</tr>'
                $(".tabla-nuevos").append(vista);
                nuevos++;
              }
                n++;
            }
          }
        if (nuevos > 0) {
          $("#box-tabla-nuevos").fadeIn();
        }else{
          $("#box-tabla-nuevos").slideUp();
        }
        if (viejos == 0) {
          $(".tabla-control").append('<tr><td colspan="8" center">No se encontraron resultados</td><tr>');
        }
      } //---fin function success
  });

},500)  //el numero son milisegundos de delay para permitir visualizar el spinner
inicializarColorBoxes();
}

$("#form_add").submit(function(e){
  $("#btn_add").attr('src','img/spinner.gif');
  e.preventDefault()
  setTimeout(function(){
  $.ajax({
        type: $("#form_add").attr('method'),
        url: $("#form_add").attr('action'),
        data: $("#form_add").serialize(),
        success: function (data) {
            console.log(data);
            $("#btn_add").attr('src','img/save.png');
            $(".form-nuevo").val('');
            if (data=='ok') {
              carga_control()
            }
        }
    });
  },0)   //el numero son milisegundos de delay para permitir visualizar el spinner
})

function modificar_control(id,campo,dato){
  $(".spinner_"+id).fadeIn(1)
  if (dato) {
    }else {
      var dato = $('#input_'+id+'_'+campo).val()
  }
  if (campo=='renovacion' ||campo=='estudio' ||campo=='financiacion' ||campo=='correo' ||campo=='pago' ||campo=='tp') {
    if (dato==1) {$('#input_'+id+'_'+campo).val(0); $('#i_'+campo+'_'+id).removeClass('tc-bbb'); $('#i_'+campo+'_'+id).addClass('green')}
    if (dato==0) {$('#input_'+id+'_'+campo).val(1); $('#i_'+campo+'_'+id).removeClass('green'); $('#i_'+campo+'_'+id).addClass('tc-bbb')}
  }
  if (campo=='fecha' && dato=='') {
    console.log('Campo fecha vacio');
    carga_control()
  }else{
    $.ajax({
        type: "PUT",
        url: "../control",
        data: {id:id,campo:campo,dato:dato},
        success: function (objeto) {
          if (objeto=='LogOut') {
            console.log("sesion cerrada");
            window.location.href = "./login";
          }
          $(".spinner_"+id).delay(1000).fadeOut()
          console.log(objeto);
          if (campo=='fecha') {
            carga_control()
          }
        }
      })
  }
}

function change_type(id,campo,ano,mes,dia){
  $('#input_a_'+id+'_'+campo).fadeOut(1)
  $('#box-fecha-'+id).fadeIn(1)
}

function addDaysToDate(date, days){
    var res = new Date(date);
    res.setDate(res.getDate() + days);
    return res;
}

$(".fa-indent").click(function(){
  $(".fa-indent").fadeOut(0)
  $('.fa-outdent').fadeIn(0)
  $(".td-opciones").css('width','300px')
})

$(".fa-outdent").click(function(){
  $(".fa-outdent").fadeOut(0)
  $('.fa-indent').fadeIn(0)
  $(".td-opciones").css('width','15px')
})

function trashed(id){
  $(".spinner_"+id).delay(1000).fadeIn()
  $.ajax({
      type: "DELETE",
      url: "../control",
      data: {id:id},
      success: function (res) {
        if (res=='LogOut') {
          console.log("sesion cerrada");
          window.location.href = "./login";
        }
        $(".spinner_"+id).delay(1000).fadeOut()
        if (res=='ok') {
          carga_control()
        }else {
          console.log(res);
        }
      }
    })
}

function trash(id) {
  $( "#dialog-confirm" ).dialog({
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    buttons: {
      "Eliminar": function() {
        $( this ).dialog( "close" );
        trashed(id);
      },
      "Cancelar": function() {
        $( this ).dialog( "close" );
      }
    }
  });
}

function info(id) {
  var nombre = $("#input_"+id+"_nombre").val()
  var observaciones = $("#input_"+id+"_observaciones").val()
  var descripcion = $("#input_"+id+"_descripcion").val()
  if (observaciones == undefined || descripcion == undefined) {
    $("#modalInfo-titulo").html('');
    $("#modalInfo-header").html('');
  }else {
    $("#modalInfo-titulo").html('<h4>'+nombre+'</h4>');
    $("#modalInfo-header").html('<div class="col100 pt10 tc-bluedefault">'+descripcion+' </div><div class="col100 bb1 pb10 tc-555">'+observaciones+'</div>');
  }
  $("#modalInfo-body").html('<div class="center"><img src="img/spinner.gif"></div>')
  $("#nuevoSegBtn"). attr('onclick' , 'nuevoSeguimiento('+id+')')
  var div = document.getElementById('modalInfo-body');
  div.scrollTop = div.scrollHeight; // Esto es para que el scrol cargue abajo
  $.ajax({
      type: "GET",
      url: "../seguimientos/"+id,
      success: function (objeto) {
        console.log(objeto);
        $("#modalInfo-body").html('<div class="f18 tc-111" style="display:inline-block">Seguimientos</div>')
        $("#modalInfo-body").addClass('boxseguimientos','pt1')

        var checkbox = document.getElementById("nuevoCheckbox");
        checkbox.checked = false;
        color='bg-eee';
        //x='<i class="fa fa-times orange" onclick="trashedSeguimiento('+objeto[i]['id']+')" aria-hidden="true" title="Eliminar"></i>' //Este elemento es solo una guia, es reemplazado en el siguiente for.
        for (var i = 0; i < objeto.length; i++) {
          var tarea=objeto[i]['tarea']
          console.log('tarea marcada con: '+tarea);
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
          console.log('el valor de resuelto es: '+objeto[i]['resuelto']);
          if (objeto[i]['resuelto'] == '1') {
            color='bg-green-lite';
            checked="checked";dato=1;
            var vistaResuelto='</br><span class="tc-555">'+fechaResueltoFormateada+'</span> - <span class="gray f10">'+horaResueltoFormateada+'</span>';
          }else {
            var vistaResuelto='';
          }
          var vistaCreado='<span class="tc-555">'+fechaFormateada+'</span> - <span class="gray f10">'+horaFormateada+'</span>';
          //const vistaResuelto='</br><span class="tc-555">'+fechaResueltoFormateada+'</span> - <span class="gray f10">'+horaResueltoFormateada+'</span>';
          if (fechaResueltoFormateada==undefined) {
            $('#resuelto'+objeto[i]['id']).addClass('oculto')
          }
          var vistaCheckbox='';

          if (objeto[i]['tarea']=='1') {
            vistaCheckbox='<input style="position: absolute;top: 10px;right: 60px;" type="checkbox" onClick="realizarTarea('+objeto[i]['id']+', '+dato+')" '+checked+' />';
          }

          var vistaSubNotas = '<div class="-mt12 tc-555" id="boxSubNotasSeg'+objeto[i]['id']+'"></div>'
          var vistaPlusSN = '<i class="fa fa-plus-square ml12 f9 tc-green pointer plusSN" aria-hidden="true" id="plusSNSeg'+objeto[i]['id']+'" onClick="clickPlusSNSeg('+objeto[i]['id']+')"></i>'
          var vistaInputSubNotas='<input class="form-control oculto" type="text" onChange="addSubNotaSeg('+objeto[i]['id']+')" id="inputAddNuevaSubNotaSeg'+objeto[i]['id']+'"/>'

          $("#modalInfo-body").append('<div id="seg'+objeto[i]['id']+'" class="mirow pt0 pb0 '+color+'"><div class="col100 f-left">'+vistaCreado+''+vistaResuelto+''+vistaCheckbox+' <p class="black mt10">'+objeto[i]['seguimiento']+'</p>'+vistaSubNotas+vistaPlusSN+vistaInputSubNotas+'</div><div class="pointer center absolute mt10" style="right:30px;"><i class="fa fa-times orange" onClick="trashedSeguimiento('+objeto[i]['id']+')" aria-hidden="true" title="Eliminar"></i></div></div>')

          if (objeto[i][['subnota']]) {
              subNotas=objeto[i]['subnota']

              for (var j = 0; j < subNotas.length; j++) {
                $('#boxSubNotasSeg'+objeto[i]['id']).append('<div class="flechaSubNota mt0 bl2 bc-green" style="width: 15px;  float: left;  margin-left: 15px;  margin-right: 2px; margin-top: 0;"><i class="fa fa-long-arrow-right tc-green" aria-hidden="true"></i></div><div>'+subNotas[j]+'</div>')
              }
          }

        }

/*
        for (var i = 0; i < objeto.length; i++) {
          if (color=='bg-eee') {color='bg-fff'}else{color='bg-eee'}
          $("#modalInfo-body").append('<div id="seg'+objeto[i]['id']+'" class="mirow '+color+'"><div class="col90"><span class="black">'+objeto[i]['fecha_seguimiento']+'</span><p class="black">'+objeto[i]['seguimiento']+'</p></div><div class="col10 pointer center"><i class="fa fa-times orange" onClick="trashedSeguimiento('+objeto[i]['id']+')" aria-hidden="true" title="Eliminar"></i></div></div>')

        }
        */
      }
    });
}

function clickPlusSNSeg(id){
  $('#plusSNSeg'+id).fadeOut(0)
  $('#inputAddNuevaSubNotaSeg'+id).fadeIn(0)
}

function trashedSeguimiento(id){
  $("#seg"+id).css("background-color","yelow")
  $.ajax({
      type: "DELETE",
      url: "../seguimientos",
      data: {id:id},
      success: function (res) {
        if (res=='ok') {
          $("#seg"+id).css("background-color","red")
          $("#seg"+id).slideUp()
        }else {
          console.log(res);
          alert('No fue posible eliminar el seguimiento')
        }
      }
    });
}

function nuevoSeguimiento(id_cliente){
  $("#nuevoSegBtn").html('<div class="center"><img src="img/spinner.gif" width="15px"></div>')
  const dataSeg=$("#nuevoSegInput").val()
  var checkbox = document.getElementById("nuevoCheckbox");
  var valorCheckbox = checkbox.checked;
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
            $("#nuevoSegInput").val('')
            $("#nuevoSegBtn").html('Guardar')
            info(id_cliente)
            if (valorCheckbox==true) {
              carga_tareas()  // esta funcion se encuentra en el archivo script-tareas-control.json
            }
          }else {
            alert(res)
          }
        }
      });
  }

}


document.getElementById('nuevoSegInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        nuevoSeguimiento();
    }
});


function inicializarColorBoxes() {
  var colorPicker = document.getElementById('colorPicker');
  var selectedColor; // Aquí se almacenará el color seleccionado

  document.body.addEventListener('click', function(event) {
  if (event.target.classList.contains('colorBox')) {
  colorPicker.style.left = event.pageX + 'px';
  colorPicker.style.top = event.pageY + 'px';
  colorPicker.style.display = 'block';
  colorPicker.selectedBox = event.target;
  }
  });

  var colorOptions = document.getElementsByClassName('colorOption');
  for (var i = 0; i < colorOptions.length; i++) {
  colorOptions[i].addEventListener('click', function(e) {
  if (colorPicker.selectedBox) {
    selectedColor = e.target.style.background; // Almacenamos el color seleccionado
    colorPicker.selectedBox.style.background = selectedColor;
    var id = colorPicker.selectedBox.getAttribute('data-miVariable');
    var campo = colorPicker.selectedBox.getAttribute('campo');
    console.log(id +' '+ campo +' '+ selectedColor);
    $("#tr_"+id).css("background", selectedColor);
    modificar_control(id,  campo, selectedColor);
  }
  colorPicker.style.display = 'none';
  });
  }

}

$("#iconLogOut").click(function(){
  if (getCookieValue('cookieControl')) {
    const username=getCookieValue('cookieControl'); // Primero almacena el valor de la nookie en una constante
    document.cookie = "cookieControl=; max-age=0; path=/";  //Segundo elimina la cookie del lado del cliente
    console.log('Serramdo sesión '+username);
    $.ajax({
      type: "GET",
      url: "logout/"+username,
      success: function (res) {
        if (res=='LogOut') {
            console.log('Sesión cerrada exitosamente');
            window.location.href = "./login";
        }
      }
    })
  }else {
    console.log('no existe la cookie');
  }

})

function checkCookie(cookieName) {  // Es para ver si la cookie existe
  var cookieList = document.cookie.split(';');

  for(var i = 0; i < cookieList.length; i++) {
    var cookie = cookieList[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) == 0) {
      return true;
    }
  }
  return false;
}

function getCookieValue(cookieName) {  // Es pra obtener el valor de la cookie
  var cookieList = document.cookie.split(';');

  for(var i = 0; i < cookieList.length; i++) {
    var cookie = cookieList[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) == 0) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return "";
}

function addSubNotaSeg(id){
  var input = $('#inputAddNuevaSubNotaSeg'+id)
  console.log(input.val());
  $.ajax({
      type: "POST",
      url: "../seguimientos/subnota",
      data: {id:id, subNota:input.val()},
      success: function (res) {
        console.log(res);
        carga_tareas();
      }
    });

}
