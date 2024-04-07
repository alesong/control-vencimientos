function descargarBackup() {
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
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error al obtener los objetos JSON: ' + textStatus);
        }
    });
}

// Asignar la función al evento 'click' del botón "btnBackup"
$('#btnBackup').on('click', descargarBackup);
