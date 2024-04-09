function buscarControl() {
  const palabraClave = $("#Buscar").val();
  $(".tabla-control").html('<tr><td colspan="8" class="center"><img src="img/spinner.gif" class="imgspin oculto" /></td></tr>');
  $(".imgspin").slideDown(250);

  $.ajax({
    type: "GET",
    url: "../control/Buscar",
    data: { palabraClave: palabraClave },
    success: function(objeto) {


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
                console.log(objeto[n]["fecha"]);
                var fecha  = new Date(objeto[n]["fecha"]).toLocaleDateString('es-la', { year:"numeric", month:"short"})
                var ano  = new Date(objeto[n]["fecha"]).toLocaleDateString('es-la', { year:"numeric"})
                var mes  = new Date(objeto[n]["fecha"]).toLocaleDateString('es-la', { month:"numeric"})
                var mesShort  = new Date(objeto[n]["fecha"]).toLocaleDateString('es-la', { month:"short"})
                var dia = new Date(objeto[n]["fecha"]).toLocaleDateString('es-la', { day:"numeric"})
                var id = objeto[n]['id']
                var spinner = '<img src="img/spinner.gif" class="spinner_celdas oculto spinner_'+id+'">'
                var input_fecha_hidden = '<div id="box-fecha-'+id+'" class="mirow -mt15 oculto"><div class="col70"><input type="date" id="input_'+id+'_fecha" class="b0 center" value="'+ano+'-'+mes+'-'+dia+'" style="width:115px;float:left;"></div><div class="col30"><img src="img/save.png"style="height:15px;cursor:pointer;" onClick="modificar_control('+id+',`fecha`)"/></div></div>'
                var input_fecha = '<input id="input_a_'+id+'_fecha" type="text" class="b0 center" value="'+dia+' '+mesShort+'" onClick="change_type('+id+',`fecha`,'+ano+','+mes+','+dia+')" style="max-width:50px;min-width:40px;>'+spinner;
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
                var td_opciones = '<td class="td-opciones"><div class="colorBox" data-miVariable="'+id+'" campo="bg"></div><i class="fa fa-info-circle blueviolet pointer" aria-hidden="true" data-toggle="modal" data-target="#modalInfo" onClick="info('+id+')"></i> <i id="trash_'+id+'" class="fa fa-trash-o red pointer" aria-hidden="true" onClick="trash('+id+')"></i></td>'
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
                var td_opciones = '<td class="td-opciones"><div class="colorBox" data-miVariable="'+id+'" campo="bg"></div><i class="fa fa-info-circle blueviolet pointer" aria-hidden="true" data-toggle="modal" data-target="#modalInfo" onClick="info('+id+')"></i> <i id="trash_'+id+'" class="fa fa-trash-o red pointer" aria-hidden="true" onClick="trash('+id+')"></i></td>'
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
    }
  });
}

function eventoBuscador(event) {
  if (event.keyCode === 13) {  // 13 es el código de tecla para Enter
    //alert("Has presionado Enter!");
    buscarControl()
  }
}

// Agrega un event listener al botón "btnBuscar"
$("#btnBuscar").click(buscarControl);
