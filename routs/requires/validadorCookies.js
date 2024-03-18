// manejadorCookies.js
const fs = require('fs');
const path = require("path");

function verificarCookies(req) {
    const patJSON = path.join(__dirname, '../../json/usuariosControl.json');
    const readJSON = () => {
        const data = fs.readFileSync(patJSON, 'utf-8');
        return JSON.parse(data);
    };

    const { usuarios } = readJSON();

    for (let item of usuarios) {
        if (req.cookies[item.nombreCookie]) {
            console.log(`La cookie con nombre ${item.nombreCookie} existe y su valor es: ${req.cookies[item.nombreCookie]}`);
            return true; // Se encontró una cookie válida, se puede renderizar la vista
        } else {
            console.log(`La cookie con nombre ${item.nombreCookie} no existe.`);
        }
    }

    return false; // No se encontró ninguna cookie válida, se debe redirigir al usuario al inicio de sesión
}

module.exports = verificarCookies;
