export function obtenerCookie(nombre) {
    var nombreEQ = nombre + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nombreEQ) == 0) return c.substring(nombreEQ.length,c.length);
    }
    return null;
}

// Obtén el valor de la cookie
var kookie = obtenerCookie('tokend');

// Ahora puedes usar miConstante
//console.log(kookie);
