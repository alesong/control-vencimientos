$(document).ready(function() {
  // Obtener el modal de Bootstrap
  var $modal = $('#modalInfo');

  // Obtener el botón de retroceso del navegador
  var backButton = window.history.back;

  // Agregar un evento de escucha al modal
  $modal.on('show.bs.modal', function() {
    console.log('Modal abierto');

    // Reemplazar el comportamiento del botón de retroceso
    $(window).on('popstate', function(event) {
      event.preventDefault();
      //window.history.go(-1); // Retroceder una página en el historial
      $modal.modal('hide'); // Cerrar el modal
    });

    // Agregar una nueva entrada al historial del navegador
    window.history.pushState({ modalOpen: true }, document.title);
  });

  // Restaurar el comportamiento original del botón de retroceso cuando el modal se cierra
  $modal.on('hidden.bs.modal', function() {
    console.log('Modal cerrado');
    $(window).off('popstate', arguments.callee);
    window.history.back = backButton;
  });
});
