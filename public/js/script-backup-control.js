function controlVersion(){

  $.ajax({
      url:'/ultimaFecha',
      type: 'GET',
      success: function(ultimaFecha){
        $('#controlVersion').html(ultimaFecha)
        const myDiv = document.getElementById('controlVersion');
        const divContent = myDiv.innerHTML;
        var ultimaFecha = new Date(divContent);
        var nuevaFecha = new Date();
        var diferencia = nuevaFecha.getTime() - ultimaFecha.getTime();
        var dias = 3 * 24 * 60 * 60 * 1000
        if (diferencia > dias) {
          diasDiferencia = Math.round(diferencia / (24 * 60 * 60 * 1000))
          var msg = 'Tiene '+diasDiferencia+' dias de direfencia, requiere realizar push con un commit de fecha más reciente en el archivo ultimaFecha.txt.';
          $('#controlVersion').append(msg)
          console.log(msg);
          $('#controlVersion').addClass('alert alert-danger')
        }else {
          console.log('es menor de 3 dia, actualizarFechaServidor()');
          //$('#controlVersion').addClass('alert alert-success')
        }
        changeColorProgressively();
      }
  })
}





function descargarBackup() {
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      console.log("La URL es localhost");
      alert('No se permite descargar la base de datos desde localhost')
  } else {
      console.log("La URL no es localhost, es " + window.location.hostname);
      // Realizar la petición AJAX
      $.ajax({
          url: '/backup',
          type: 'GET',
          dataType: 'json',
          success: function(objetos) {
              // Para cada objeto en la respuesta
              for (var i = 0; i < objetos.length; i++) {
                  // Obtener las claves del objeto (clientes, seguimientos, notas)
                  var claves = Object.keys(objetos[i]);

                  // Para cada clave en el objeto
                  for (var j = 0; j < claves.length; j++) {
                      // Crear un nuevo objeto con el nombre y los datos
                      var nuevoObjeto = {};
                      nuevoObjeto[claves[j]] = objetos[i][claves[j]];

                      // Convertir el nuevo objeto en una cadena
                      var datos = JSON.stringify(nuevoObjeto);

                      // Crear un nuevo objeto Blob con los datos
                      var blob = new Blob([datos], {type: 'application/json'});

                      // Crear un enlace para descargar el Blob
                      var url = URL.createObjectURL(blob);

                      // Crear un elemento 'a' temporal
                      var a = document.createElement('a');

                      // Obtener la fecha y hora actuales
                      var ahora = new Date();

                      // Formatear la fecha y hora
                      var fecha = ahora.getFullYear().toString() +
                          (ahora.getMonth() + 1).toString().padStart(2, '0') +
                          ahora.getDate().toString().padStart(2, '0') +
                          ahora.getHours().toString().padStart(2, '0') +
                          ahora.getMinutes().toString().padStart(2, '0') +
                          ahora.getSeconds().toString().padStart(2, '0');

                      // Mostrar la fecha y hora formateadas en la consola
                      console.log(fecha);

                      // Establecer el href y el nombre del archivo de descarga
                      a.href = url;
                      a.download = claves[j] + '-' + fecha + '.json';

                      // Agregar el elemento 'a' al cuerpo del documento y hacer clic en él
                      document.body.appendChild(a);
                      a.click();

                      // Eliminar el elemento 'a' después de la descarga
                      document.body.removeChild(a);

                      var nuevaFecha = new Date();
                      $('#controlVersion').html(nuevaFecha)
                      $('#controlVersion').removeClass('alert alert-danger')
                      //$('#controlVersion').addClass('alert alert-success')
                      $.ajax({
                          url:'/ultimaFecha',
                          type: 'POST',
                          data: {nuevaFecha:nuevaFecha},
                          success: function(res){
                            if (res == 'ok') {
                              changeColorProgressively();
                            }
                          }
                      })
                  }
              }
          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.error('Error al obtener los objetos JSON: ' + textStatus);
          }
      });
  }

}

// Asignar la función al evento 'click' del botón "btnBackup"
$('#btnBackup').on('click', descargarBackup);



// Función que simula un clic en el botón "btnBackup"
function clickBackupButton() {
  // Obtener el elemento del botón
  const backupButton = document.getElementById('btnBackup');

  // Simular un clic en el botón
  backupButton.click();
}

// Función que programa la ejecución de la función clickBackupButton() a las 6:30 p.m. todos los días
function scheduleBackupClick() {
  // Obtener la hora actual
  const now = new Date();

  // Calcular la próxima hora de ejecución (6:30 p.m. del día actual)
  const nextExecutionTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    18, // Hora: 6 p.m.
    30, // Minutos: 30
    0 // Segundos: 0
  );

  // Si la próxima hora de ejecución ya pasó, programar para el día siguiente
  if (nextExecutionTime < now) {
    nextExecutionTime.setDate(nextExecutionTime.getDate() + 1);
  }

  // Programar la ejecución de la función clickBackupButton() a la próxima hora de ejecución
  setTimeout(clickBackupButton, nextExecutionTime - now);

  // Programar la siguiente ejecución
  setTimeout(scheduleBackupClick, 24 * 60 * 60 * 1000); // 24 horas en milisegundos
}

// Iniciar la programación de la ejecución
scheduleBackupClick();




function changeColorProgressively() {
  // Obtener el elemento con el ID "controlVersion"
  const controlVersionElement = document.getElementById("controlVersion");

  // Obtener la fecha almacenada en el elemento
  var elemento = $('#controlVersion').html()
  const storedDate = new Date(elemento);

  // Obtener la fecha actual
  const currentDate = new Date();

  // Calcular el tiempo transcurrido en milisegundos
  const timeDiff = currentDate.getTime() - storedDate.getTime();

  // Calcular el porcentaje de tiempo transcurrido (de 0 a 1)
  const progressPercentage = Math.min(timeDiff / (24 * 60 * 60 * 1000), 1);

  // Calcular el color intermedio entre #75c675 y #c67575 en función del porcentaje de tiempo transcurrido
  const redValue = Math.round(0x75 + (0xc6 - 0x75) * progressPercentage);
  const greenValue = Math.round(0xc6 - (0xc6 - 0x75) * progressPercentage);
  const blueValue = Math.round(0x75 + (0x75 - 0x75) * progressPercentage);

  // Convertir los valores RGB a un color hexadecimal
  const newColor = `#${redValue.toString(16).padStart(2, '0')}${greenValue.toString(16).padStart(2, '0')}${blueValue.toString(16).padStart(2, '0')}`;

  // Establecer el nuevo color en el elemento
  controlVersionElement.style.color = newColor;

  // Solicitar la siguiente actualización de color
  requestAnimationFrame(changeColorProgressively);
}


controlVersion();
