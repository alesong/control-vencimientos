function ruta_mantenimiento(app){
console.log('pasó por mantenimiento');
const body_parser = require('body-parser')
const cookieParser = require('cookie-parser');
const verificarCookies = require('./requires/validadorCookies');
app.use(cookieParser())
app.use(body_parser.urlencoded({extended:true}))

  app.get('/mantenimiento', function (req, res) {
    const puedeRenderizar = verificarCookies(req);
    if (puedeRenderizar) {
        res.render('mantenimiento'); // Renderiza la vista si se pueden renderizar las cookies
    } else {
        res.redirect('../login'); // Redirige al usuario al inicio de sesión si no se pueden renderizar las cookies
    }
    // res.render('mantenimiento')
  });



}
module.exports=ruta_mantenimiento
