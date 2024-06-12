// config.js
var port = '3000';
var newHost = 'http://localhost:' + port;

if (window.location.hostname === "https://control-vencimientos.onrender.com/" || window.location.hostname === "45.173.12.90") {
    newHost = 'http://45.173.12.90:' + port;
}
console.log(window.location.hostname);
console.log(newHost);
export default newHost;
