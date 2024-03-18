function ruta_login(app){
console.log('pasó por login');
const body_parser = require('body-parser')
const cookieParser = require('cookie-parser');
const verificarCookies = require('./requires/validadorCookies');
app.use(cookieParser());
app.use(body_parser.urlencoded({extended:true}))


  app.get('/login', function (req, res) {
    verificarCookies(req, res);
    res.render('login');
  });




  app.put('/login', (req, res)=>{
    const username = req.body.username
    const password = req.body.password
    const campo = req.body.campo
    const dato = req.body.dato

    const fs = require('fs');
    const path = require("path")
    const patJSON = path.join(__dirname, '../json/usuariosControl.json')
    const readJSON =  () => {
    const data =  fs.readFileSync(patJSON, 'utf-8')
    return JSON.parse(data)
    }

    const {usuarios} = readJSON()
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i]['username']==username && usuarios[i]['password']==password) {
      res.cookie('cookie_'+username, dato, { maxAge: 12 * 60 * 60 * 10000, httpOnly: true }); //crea una cookie en bakend temporalmente 12 horas * 60 minutos * 60 segundos * 1000 milisegundos
/*
        const writeJSON =  (data) => {
           fs.writeFileSync(patJSON, JSON.stringify(data, null, 4), 'utf-8');  // esto es por si desea guardar algo en el json de usuarios
        }
*/
        res.send('LogIn')
        return('LogIn')
      }else {
        res.send("usuario o contrasena invalidos");
        return("usuario o contrasena invalidos")
      }
    }

  })


  app.get('/logout/:username', function (req, res) {
    const username = req.params['username']
    console.log(username);
    res.clearCookie('cookie_'+username);
    res.send('LogOut');
  });



}
module.exports=ruta_login
