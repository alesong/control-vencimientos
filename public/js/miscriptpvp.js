$(document).ready(function(){
  console.log('jQuery incluído');
  reload();
});

function reload(){
  //console.log('cargando JSON');
  var tiempo = 24*60*60*1000; //24horas
  $.ajax({
      type: "GET",
      url: "/loadpvp",
      success: function (objeto) {
        for (var i = 0; i < objeto.length; i++) {

          if (objeto[i]['estrella'] == 0) {
            $('#'+i+'start').addClass('oculto');
          }
          if (objeto[i]['estrella'] == 1) {
            $('#'+i+'start').removeClass('oculto');
          }

          if (objeto[i]['visible'] == 0) {
            $('#'+i+'box').addClass('oculto');
          }
          if (objeto[i]['visible'] == 1) {
            $('#'+i+'box').removeClass('oculto');
          }

          $('#'+i+'Anum').html(objeto[i]['puntaje1']);
          $('#'+i+'Bnum').html(objeto[i]['puntaje2']);
          $('#'+i+'Aname').html(objeto[i]['nombre1']);
          $('#'+i+'Bname').html(objeto[i]['nombre2']);

        }

        console.log(tiempo);
        setTimeout(() => {
        reload();
      }, tiempo);
        }
    })


}

function reload2(){
  location.reload()
}
