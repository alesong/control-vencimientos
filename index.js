//-------conexion a base de datos
const pool = require('./db');
//-----fin conexion a base de datos -----

//----crear suervidor--------------
const express = require("express");
const app = express();
app.set('port', 3000);  // el metodo set almacena una variable gloval, en este caso es la variable port.
app.listen(app.get('port'),function(){
  console.log('Server on port '+app.get('port'));
});
//--------------------------

const axios = require('axios');

//------ motor de renderizar vistas----
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
//-----------------------------------

//---metodo para entender lo que viene al servidor llamados mitherware---
//---debe estar antes de las rutas---conseguir mas mitherware en a red
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//----------------------------

//------------rutas---------------
app.use(function(req, res, next){ // eto es un mitherware, se pueden poner vairos
    //console.log('todas las peticiones. '+new Date());
    next(); // esto es obligatorio
});

//rutas.1---las siguietes tambien son sutas pero vienen de un archivo separado.
const ruta_raiz=require('./routs/raiz');
ruta_raiz(app);
const ruta_archivo=require('./routs/archivo');
app.use(ruta_archivo);
const ruta_json=require('./routs/json');
ruta_json(app)
const ruta_post=require('./routs/post');
app.use(ruta_post);

app.get('/tabla/:tabla', async function(req, res){
  var tabla = req.params.tabla;
  var sql ='SELECT * FROM '+tabla;
  var resDB = await pool(sql);
  res.json(resDB[0]);
  //res.send(resDB[0][0]['nombre_paciente'])

})
const ruta_test = require('./routs/test')
ruta_test(app, pool)
const ruta_control = require('./routs/control')
ruta_control(app, pool)

const ruta_mantenimiento = require('./routs/mantenimiento')
ruta_mantenimiento(app, pool)
const ruta_guardarPersona = require('./routs/guardarPersona')
ruta_guardarPersona(app, pool)
const ruta_pdf = require('./routs/pdf')
ruta_pdf(app, pool)

const ruta_pvp = require('./routs/pvp')
ruta_pvp(app, pool)
const ruta_pvpedit = require('./routs/pvpedit')
ruta_pvpedit(app, pool)

const ruta_controlPVP = require('./routs/controlPVP')
ruta_controlPVP(app, pool)

const ruta_rangosa2g = require('./routs/rangosa2g')
ruta_rangosa2g(app, pool)

const ruta_comparativo = require('./routs/comparativo')
ruta_comparativo(app, pool)

const ruta_recordsA2G = require('./routs/recordsA2G')
ruta_recordsA2G(app, pool)

const ruta_login = require('./routs/loginback')
ruta_login(app, pool)

app.use(function(req,res){     // Maneja las peticiones que no existen
  res.status(404).send('Página no encontrada!');
});
//------------fin rutas------------------
