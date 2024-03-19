function ruta_control(app){
console.log('pasó por control');
const body_parser = require('body-parser')
const cookieParser = require('cookie-parser');
const verificarCookies = require('./requires/validadorCookies');
const axios = require('axios');
const moment = require('moment-timezone');
app.use(cookieParser())
app.use(body_parser.urlencoded({extended:true}))

  app.get('/ping', function (req, res) {
   res.send('pong'); 
  })
  
  app.get('/control/:mes', function (req, res) {

    if (session()==true) {
      const mes = req.params['mes']
      console.log('Mes solicitado: '+mes);
      const fs = require('fs');
      const path = require("path")
      const patJSON = path.join(__dirname, '../json/clientes.json')
      const readJSON =  () => {
      const data =  fs.readFileSync(patJSON, 'utf-8')
      return JSON.parse(data)
      }
      const objeto = []
      const {clientes} = readJSON()
      for (var i = 0; i < clientes.length; i++) {

        if (clientes[i]['fecha']!='') {
          fecha_objeto = clientes[i]['fecha']
          fecha_objeto = fecha_objeto.replace(/-/g, ',')
          fecha_objeto = new Date(fecha_objeto)
          var mes_objeto = new Date(fecha_objeto).toLocaleDateString('es-LA', {month:"short"})
        }else {
          var mes_objeto='';
        }

        if ((mes_objeto==mes || clientes[i]['fecha']=='') && clientes[i]['papelera'] == 0) {
          //console.log(mes_objeto);
          objeto.push({
            id : clientes[i]['id'],
            fecha : fecha_objeto,  //clientes[i]['fecha'],
            nombre : clientes[i]['nombre'],
            ramo : clientes[i]['ramo'],
            cia : clientes[i]['cia'],
            descripcion : clientes[i]['descripcion'],
            observaciones : clientes[i]['observaciones'],
            renovacion : clientes[i]['renovacion'],
            estudio : clientes[i]['estudio'],
            financiacion : clientes[i]['financiacion'],
            correo : clientes[i]['correo'],
            pago : clientes[i]['pago'],
            tp : clientes[i]['tp'],
            bg : clientes[i]['bg'],
            papelera : clientes[i]['papelera'],
          })
        }
        fecha_objeto=''
      }
      res.json(objeto);
    }else {
      res.send('LogOut');
    }



     //-------inicio Compruebador de sesion-----// agregar esto a todas las vistas
     function session(){
       const puedeRenderizar = verificarCookies(req);
       if (puedeRenderizar) {
           return(true); // Renderiza la vista si se pueden renderizar las cookies
       } else {
           return(false); // Redirige al usuario al inicio de sesión si no se pueden renderizar las cookies
       }
     }
     //-------fin Compruebador de sesion-----//


  });



  app.post('/control', (req, res)=>{
    if (session()==true) {
      if ('nombre' in req.body) {
        const fecha = ''
        const nombre = req.body.nombre + ''
        const ramo = req.body.ramo + ''
        const cia = req.body.cia + ''
        const descripcion = req.body.descripcion + ''
        const observaciones = req.body.observaciones + ''
        if (nombre == '') {
          console.log('campos vacios')
          res.send('campos vacios')
        }else {

          const fs = require('fs');
          const path = require("path")

          const patJSON = path.join(__dirname, '../json/clientes.json')

          const readJSON =  () => {
            const data =  fs.readFileSync(patJSON, 'utf-8')
            return JSON.parse(data)
          }

          const writeJSON =  (data) => {
             fs.writeFileSync(patJSON, JSON.stringify(data, null, 4), 'utf-8');
          }

          const {clientes} = readJSON()
          const n = clientes.length
          clientes.push({
            id : n+1,
            fecha : fecha,
            nombre : nombre,
            ramo : ramo,
            cia : cia,
            descripcion : descripcion,
            observaciones : observaciones,
            renovacion : "0",
            estudio : "0",
            financiacion : "0",
            correo : "0",
            pago : "0",
            tp : "1",
            bg : "",
            papelera : 0
          })

          writeJSON({
            clientes: clientes,
          })

          console.log('Se ha agregado: '+nombre)
          res.send('ok')
        }

      }else {
        console.log('no existen variabes post nombre y apellido');
      //  console.log(req);
      }
      res.send('ok post');
    }else {
      res.send('LogOut');
    }


    //-------inicio Compruebador de sesion-----// agregar esto a todas las vistas
    function session(){
      const puedeRenderizar = verificarCookies(req);
      if (puedeRenderizar) {
          return(true); // Renderiza la vista si se pueden renderizar las cookies
      } else {
          return(false); // Redirige al usuario al inicio de sesión si no se pueden renderizar las cookies
      }
    }
    //-------fin Compruebador de sesion-----//



  })




  app.put('/control', (req, res)=>{

    if (session()==true) {


      const id = req.body.id
      const campo = req.body.campo
      const dato = req.body.dato
      //res.send('entró al put, '+id+campo+dato)
      const fs = require('fs');
      const path = require("path")
      const patJSON = path.join(__dirname, '../json/clientes.json')
      const readJSON =  () => {
      const data =  fs.readFileSync(patJSON, 'utf-8')
      return JSON.parse(data)
      }
      const {clientes} = readJSON()
      for (var i = 0; i < clientes.length; i++) {
        if (clientes[i]['id']==id) {
          clientes[i][campo]=dato
        }
      }
      const writeJSON =  (data) => {
         fs.writeFileSync(patJSON, JSON.stringify(data, null, 4), 'utf-8');
      }
      writeJSON({
        clientes: clientes,
      })
      console.log('Se ha modificado el id : '+id+' campo: '+campo+' dato: '+dato)

      res.send('ok')


    }else {
      res.send('LogOut');
    }





    //-------inicio Compruebador de sesion-----// agregar esto a todas las vistas
    function session(){
      const puedeRenderizar = verificarCookies(req);
      if (puedeRenderizar) {
          return(true); // Renderiza la vista si se pueden renderizar las cookies
      } else {
          return(false); // Redirige al usuario al inicio de sesión si no se pueden renderizar las cookies
      }
    }
    //-------fin Compruebador de sesion-----//


  })


  app.delete("/control", (req, res) =>{

    if (session()==true) {

      const id = req.body.id
      const fs = require('fs');
      const path = require("path")
      const patJSON = path.join(__dirname, '../json/clientes.json')
      const readJSON =  () => {
      const data =  fs.readFileSync(patJSON, 'utf-8')
      return JSON.parse(data)
      }
      const {clientes} = readJSON()
      for (var i = 0; i < clientes.length; i++) {
        if (clientes[i]['id']==id) {
          clientes[i]['papelera']=1
        }
      }
      const writeJSON =  (data) => {
         fs.writeFileSync(patJSON, JSON.stringify(data, null, 4), 'utf-8');
      }
      writeJSON({
        clientes: clientes,
      })
      console.log('Se ha eliminado el id : '+id)

      res.send('ok');

    }else {
      res.send('LogOut');
    }



    //-------inicio Compruebador de sesion-----// agregar esto a todas las vistas
    function session(){
      const puedeRenderizar = verificarCookies(req);
      if (puedeRenderizar) {
          return(true); // Renderiza la vista si se pueden renderizar las cookies
      } else {
          return(false); // Redirige al usuario al inicio de sesión si no se pueden renderizar las cookies
      }
    }
    //-------fin Compruebador de sesion-----//


  })


  app.get('/seguimientos/:id', function (req, res) {
    if (session()==true) {
      const id = req.params['id']
      const fs = require('fs')
      const path = require("path")
      const patJSON = path.join(__dirname, '../json/seguimientos.json')
      const readJSON =  () => {
      const data =  fs.readFileSync(patJSON, 'utf-8')
      return JSON.parse(data)
      }
      const objeto = []
      const {seguimientos} = readJSON()

      for (var i = 0; i < seguimientos.length; i++) {
        if (id == seguimientos[i]['idcliente'] && seguimientos[i]['papelera'] == 0) {
          //console.log(mes_objeto);
          objeto.push({
            id : seguimientos[i]['id'],
            id_cliente : seguimientos[i]['id_cliente'],
            fecha_seguimiento : seguimientos[i]['fecha_seguimiento'],
            seguimiento : seguimientos[i]['seguimiento'],
            papelera : seguimientos[i]['papelera'],
          })
        }
      }
      res.json(objeto);
    }else {
      res.send('LogOut');
    }


     //-------inicio Compruebador de sesion-----// agregar esto a todas las vistas
     function session(){
       const puedeRenderizar = verificarCookies(req);
       if (puedeRenderizar) {
           return(true); // Renderiza la vista si se pueden renderizar las cookies
       } else {
           return(false); // Redirige al usuario al inicio de sesión si no se pueden renderizar las cookies
       }
     }
     //-------fin Compruebador de sesion-----//

  });


  app.delete("/seguimientos", (req, res) =>{
    const id = req.body.id
    const fs = require('fs');
    const path = require("path")
    const patJSON = path.join(__dirname, '../json/seguimientos.json')
    const readJSON =  () => {
    const data =  fs.readFileSync(patJSON, 'utf-8')
    return JSON.parse(data)
    }
    const {seguimientos} = readJSON()
    for (var i = 0; i < seguimientos.length; i++) {
      if (seguimientos[i]['id']==id) {
        seguimientos[i]['papelera']=1
      }
    }
    const writeJSON =  (data) => {
       fs.writeFileSync(patJSON, JSON.stringify(data, null, 4), 'utf-8');
    }
    writeJSON({
      seguimientos: seguimientos,
    })
    console.log('Se ha eliminado el seguimiento con id : '+id)

    //-------inicio Compruebador de sesion-----// agregar esto a todas las vistas
         const puedeRenderizar = verificarCookies(req);
         if (puedeRenderizar) {
             res.send('ok'); // Renderiza la vista si se pueden renderizar las cookies
         } else {
             res.send('LogOut'); // Redirige al usuario al inicio de sesión si no se pueden renderizar las cookies
         }
    //-------fin Compruebador de sesion-----//
    //res.send('ok')
  })



  app.post('/seguimientos', (req, res)=>{
    console.log(req.body.id_cliente);
    console.log(req.body.dataSeg);
    if ('dataSeg' in req.body) {
      const dataSeg = req.body.dataSeg + ''
      const id_cliente = req.body.id_cliente + ''
      const fecha = new Date();
      if (dataSeg == '') {
        console.log('campos vacios')
        res.send('campos vacios')
      }else {

        const fs = require('fs');
        const path = require("path")

        const patJSON = path.join(__dirname, '../json/seguimientos.json')

        const readJSON =  () => {
          const data =  fs.readFileSync(patJSON, 'utf-8')
          return JSON.parse(data)
        }

        const writeJSON =  (data) => {
           fs.writeFileSync(patJSON, JSON.stringify(data, null, 4), 'utf-8');
        }

        const {seguimientos} = readJSON()
        const n = seguimientos.length
        seguimientos.push({
          id : n+1,
          idcliente : id_cliente,
          fecha_seguimiento : fecha,
          seguimiento : dataSeg,
          papelera : 0
        })

        writeJSON({
          seguimientos: seguimientos,
        })

        console.log('Se ha agregado el seguimiento: '+dataSeg)

        //-------inicio Compruebador de sesion-----// agregar esto a todas las vistas
             const puedeRenderizar = verificarCookies(req);
             if (puedeRenderizar) {
                 res.send('ok'); // Renderiza la vista si se pueden renderizar las cookies
             } else {
                 res.send('LogOut'); // Redirige al usuario al inicio de sesión si no se pueden renderizar las cookies
             }
        //-------fin Compruebador de sesion-----//
        //res.send('ok')
      }

    }else {
      console.log('no existen variabes post');
      res.send('no existen variabes post')
    }
    res.send('ok post')

  })

  // Define el intervalo de tiempo en segundos
  const intervalo = 40 * 1000; // 40 segundos

  setInterval(async () => {
      try {
          const response = await axios.get('http://localhost:4000/ping');
        //const response = await axios.get('https://control-vencimientos.onrender.com/');
          console.log(`Petición realizada a las ${moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss')}`);
          console.log(response.data);
      } catch (error) {
          console.log(`Error al realizar la petición a las ${moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss')}`);
          console.error(error);
      }
  }, intervalo);

  app.get('/ping', function (req, res) {
      res.send('pong'); 
  })


}
module.exports=ruta_control
