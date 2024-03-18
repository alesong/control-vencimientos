$(document).ready(function(){
  console.log('jQuery incluído');
  reload();
});

function reload(){
  //console.log('cargando JSON');
  $.ajax({
      type: "GET",
      url: "/loadpvp",
      success: function (objeto) {
        //console.log(objeto);
        for (var i = 0; i < objeto.length; i++) {

          if (objeto[i]['visible'] == 0) {
            $('#'+i+'box').addClass('opaco');
          }
          if (objeto[i]['visible'] == 1) {
            $('#'+i+'box').removeClass('opaco');
          }

          $('#'+i+'Anum').val(objeto[i]['puntaje1']);
          $('#'+i+'Bnum').val(objeto[i]['puntaje2']);
          $('#'+i+'Aname').val(objeto[i]['nombre1']);
          $('#'+i+'Bname').val(objeto[i]['nombre2']);

          if (objeto[i]['estrella']==1) {
            $('#'+i+'start').removeClass('fa-star-o');
            $('#'+i+'start').addClass('fa-star yellow');
          }

          if (objeto[i]['estrella']==0) {
            $('#'+i+'start').removeClass('fa-star yellow');
            $('#'+i+'start').addClass('fa-star-o');
          }

          if (objeto[i]['visible']==1) {
            $('#'+i+'visible').removeClass('fa-circle-o');
            $('#'+i+'visible').addClass('fa-circle green');
          }

          if (objeto[i]['visible']==0) {
            $('#'+i+'visible').removeClass('fa-circle grin');
            $('#'+i+'visible').addClass('fa-circle-o');
          }


        }



        }
    })


}

function update(id,campo){
  var dato = $("#"+campo).val();
  console.log('campo: '+campo);
  console.log('dato: '+dato);
  console.log('id: '+id);

  $.ajax({
      type: "PUT",
      url: "/updatepvp",
      data: {"id":id,"campo":campo,"dato":dato},
      success: function (objeto) {
        console.log(objeto);
      }
    });

}

function estrella(id,estrella){
  console.log(estrella);
  $.ajax({
      type: "PUT",
      url: "/updatestar",
      data: {"id":id,"campo":estrella},
      success: function (objeto) {
        console.log(objeto);
        reload();
      }
    });
}

function visible(id,visible){
  console.log(visible);
  $.ajax({
      type: "PUT",
      url: "/updatevisible",
      data: {"id":id,"campo":visible},
      success: function (objeto) {
        console.log(objeto);
        reload();
      }
    });
}
