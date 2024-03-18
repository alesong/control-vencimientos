$(document).ready(function(){
  console.log('jQuery incluído');
  carga_lista();
});



function carga_lista(){
  console.log('lista');
  $.ajax({
      type: "GET",
      url: "../guardarPersona",
      success: function (objeto) {
        console.log(objeto);
        colocar_datos(objeto);
      }
    })
}



function colocar_datos(objeto){
  $("#tbody-clientes").html('');
  $("#tbody-clientes").append('<tr><td colspan="10" class="center"><img src="img/spinner.gif"></td></tr>');
  var filas = objeto.length;
  if (filas==0) {
    console.log('Objeto vacío');
    $("#tbody-clientes").html('');
    $("#tbody-clientes").append('<tr><td colspan="10" class="alert alert-info">Objeto Vacio</td></tr>');
  }else {
    $("#tbody-clientes").html('');
    var n=filas-1
    var limit=$("#limit").val()
    if ((filas-limit)<=0) {
      vueltas=0
    }else {
      vueltas=filas-limit
    }
    while (n >= vueltas) {
      id = '<td class="center">'+objeto[n]['id']+'</td>'
      nombre = '<td>'+objeto[n]['nombre']+'</td>'
      cel = '<td>'+objeto[n]['cel']+'</td>'
      marca = '<td>'+objeto[n]['marca']+'</td>'
      serial = '<td>'+objeto[n]['serial']+'</td>'
      observaciones = '<td>'+objeto[n]['observaciones']+'</td>'
      precio = '<td>$'+objeto[n]['precio']+'</td>'
      whatsapp = '<td><div class="center"><a class="center" href="https://api.whatsapp.com/send?phone=+57'+objeto[n]['cel']+'&amp;text=Recibo Mantenimiento PC." target="_blank"><i class="fa fa-whatsapp green" aria-hidden="true" ></i></a></div></td>'
      pdf = '<td><div class="center"><a class="center" href="pdf/'+objeto[n]['id']+'" target="_blank"><i class="fa fa-file-pdf-o red" aria-hidden="true"></i></a></div></td>'
      del = '<td><div class="center"><i class="fa fa-trash-o orange pointer" onClick="trash('+objeto[n]['id']+')" aria-hidden="true"></i></div></td>'
      $("#tbody-clientes").append('<tr id="tr_'+objeto[n]['id']+'" class="bg-fff">'+id+nombre+cel+marca+serial+observaciones+precio+whatsapp+pdf+del+'</tr>');
      n--;
    }
  }
}


function trashed(id){
  $("#tr_"+id).removeClass('bg-fff');
  $.ajax({
      type: "DELETE",
      url: "../guardarPersona",
      data: {id:id},
      success: function (res) {
        if (res=='ok') {
          console.log('elemento '+id+' eliminado');
          $("#tr_"+id).addClass('bg-red tc-fff');
          $("#tr_"+id).delay(500).fadeOut(1000);
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


$("#limit").change(function(){
  carga_lista()
})


$("#form_guardarPersona").submit(function(e){
  e.preventDefault()
  $.ajax({
        type: $(this).attr('method'),
        url: $(this).attr('action'),
        data: $(this).serialize(),
        success: function (data) {
            console.log(data);
            if (data=='ok') {
              $("#nombre").val('')
              $("#cel").val('')
              $("#marca").val('')
              $("#serial").val('')
              $("#observaciones").val('')
              $("#precio").val('')
              $("#modalAgregarPersona").modal('hide')
              carga_lista()
            }
        }
    });
})
