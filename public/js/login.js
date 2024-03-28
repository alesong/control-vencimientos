//import { obtenerCookie } from './obtenerCookie.js';

$(document).ready(function(){
  console.log('jQuery incluído');
});

$("#formlogin").submit(function(e){
  e.preventDefault()
  var username = $("#username").val()
  var password = $("#password").val()
  var fecha  = new Date()
  $.ajax({
      type: "PUT",
      url: "../login",
      data: {campo:'fecha',dato:fecha,username:username,password:password},
      success: function (res) {
        console.log('Respuesta: '+res);
        if (res=='LogIn') {
          document.cookie = "cookieControl="+username+"; max-age=" + 30 * 60 + "; path=/";
          window.location.href = "./";
        }else {
          alert(res)
        }
      }
    })

})



function session(tokend){
  console.log('sesion: '+tokend);
  $.ajax({
      type: "GET",
      url: "../loginback",
      data: {cookie:tokend},
      success: function (res) {
        console.log('la respuesta es: '+res);
      }
    })
}
