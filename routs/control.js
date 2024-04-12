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



      // Agregar la siguiente condición
   if (mes === 'Buscar') {
     const palabraClave = req.query.palabraClave // Obtener la palabra clave de la consulta
     for (var i = 0; i < clientes.length; i++) {
       const cliente = clientes[i]
       if (Object.values(cliente).some(value => value.toString().toLowerCase().includes(palabraClave.toLowerCase()))) {
         if (clientes[i]['papelera'] == 0) {
           objeto.push({
             id : cliente['id'],
             fecha : cliente['fecha'],
             nombre : cliente['nombre'],
             ramo : cliente['ramo'],
             cia : cliente['cia'],
             descripcion : cliente['descripcion'],
             observaciones : cliente['observaciones'],
             renovacion : cliente['renovacion'],
             estudio : cliente['estudio'],
             financiacion : cliente['financiacion'],
             correo : cliente['correo'],
             pago : cliente['pago'],
             tp : cliente['tp'],
             bg : cliente['bg'],
             papelera : cliente['papelera']
           });
         }
       }
     }
     res.json(objeto);
     return; // Salir del código después de la búsqueda
   }



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
  if (session()) {
    const id = req.params['id'];

    const fs = require('fs');
    const path = require("path");
    const patJSON = path.join(__dirname, '../json/seguimientos.json');

    const readJSON = () => {
      const data = fs.readFileSync(patJSON, 'utf-8');
      return JSON.parse(data);
    };

    const objeto = [];

    const { seguimientos } = readJSON();

    for (let i = 0; i < seguimientos.length; i++) {
      if (id == seguimientos[i]['idcliente'] && seguimientos[i]['papelera'] == 0) {
        objeto.push({
          id: seguimientos[i]['id'],
          id_cliente: seguimientos[i]['id_cliente'],
          fecha_seguimiento: seguimientos[i]['fecha_seguimiento'],
          seguimiento: seguimientos[i]['seguimiento'],
          tarea: seguimientos[i]['tarea'],
          resuelto: seguimientos[i]['resuelto'],
          fechaResuelto: seguimientos[i]['fechaResuelto'],
          papelera: seguimientos[i]['papelera'],
          subnota: seguimientos[i]['subnota'] || [] // Agrega las subnotes
        });
      }
    }

    res.json(objeto);
  } else {
    res.send('LogOut');
  }

  function session() {
    const puedeRenderizar = verificarCookies(req);
    if (puedeRenderizar) {
      return true; // Renderiza la vista si se pueden renderizar las cookies
    } else {
      return false; // Redirige al usuario al inicio de sesión si no se pueden renderizar las cookies
    }
  }
});

  app.get('/tareas', function (req, res) {
  // console.log('tareas back');

  if (session()) {
    const fs = require('fs');
    const path = require("path");
    const patJSON = path.join(__dirname, '../json/seguimientos.json');

    const readJSON = () => {
      const data = fs.readFileSync(patJSON, 'utf-8');
      return JSON.parse(data);
    };

    const objeto = [];

    const { seguimientos } = readJSON();

    for (let i = 0; i < seguimientos.length; i++) {
      if (seguimientos[i]['papelera'] == 0 && seguimientos[i]['tarea'] == 1) {
        let nombreCliente = '';
        if (seguimientos[i]['resuelto'] == 1) {
          const fecha = new Date(seguimientos[i]['fechaResuelto']);
          const fechaActual = new Date();
          const diferencia = fechaActual - fecha;
          const dias = diferencia / (1000 * 60 * 60 * 24);

          if (dias < 5) {
            nombreCliente = traerNombreCliente(seguimientos[i]['idcliente']);
            objeto.push({
              id: seguimientos[i]['id'],
              idcliente: seguimientos[i]['idcliente'],
              nombreCliente: nombreCliente,
              fecha_seguimiento: seguimientos[i]['fecha_seguimiento'],
              seguimiento: seguimientos[i]['seguimiento'],
              tarea: seguimientos[i]['tarea'],
              resuelto: seguimientos[i]['resuelto'],
              fechaResuelto: seguimientos[i]['fechaResuelto'],
              papelera: seguimientos[i]['papelera'],
              subnota: seguimientos[i]['subnota'] || [] // Agrega las subnotes
            });
          }
        } else {
          nombreCliente = traerNombreCliente(seguimientos[i]['idcliente']);
          objeto.push({
            id: seguimientos[i]['id'],
            idcliente: seguimientos[i]['idcliente'],
            nombreCliente: nombreCliente,
            fecha_seguimiento: seguimientos[i]['fecha_seguimiento'],
            seguimiento: seguimientos[i]['seguimiento'],
            tarea: seguimientos[i]['tarea'],
            resuelto: seguimientos[i]['resuelto'],
            fechaResuelto: seguimientos[i]['fechaResuelto'],
            papelera: seguimientos[i]['papelera'],
            subnota: seguimientos[i]['subnota'] || [] // Agrega las subnotes
          });
        }
      }
    }

    // console.log(objeto);
    res.json(objeto);
  } else {
    res.send('LogOut');
  }

  function traerNombreCliente(id) {
    const fs = require('fs');
    const path = require("path");
    const patJSON = path.join(__dirname, '../json/clientes.json');

    const readJSON = () => {
      const data = fs.readFileSync(patJSON, 'utf-8');
      return JSON.parse(data);
    };

    const { clientes } = readJSON();

    for (let i = 0; i < clientes.length; i++) {
      if (id == clientes[i]['id']) {
        return clientes[i]['nombre'];
      }
    }
  }

  function session() {
    const puedeRenderizar = verificarCookies(req);
    if (puedeRenderizar) {
      return true; // Renderiza la vista si se pueden renderizar las cookies
    } else {
      return false; // Redirige al usuario al inicio de sesión si no se pueden renderizar las cookies
    }
  }
});


 app.get('/notas', function (req, res) {
   //console.log('tareas back');
   if (session()==true) {

     const fs = require('fs')
     const path = require("path")
     const patJSON = path.join(__dirname, '../json/notasControl.json')
     const readJSON =  () => {
     const data =  fs.readFileSync(patJSON, 'utf-8')
     return JSON.parse(data)
     }
     const objeto = []
     const {notasControl} = readJSON()

     for (var i = 0; i < notasControl.length; i++) {
       if (notasControl[i]['papelera'] == 0 && notasControl[i]['tarea'] == 1) {
         var nombreCliente=''


         if (notasControl[i]['resuelto'] == 1) {
           var fecha = new Date(notasControl[i]['fechaResuelto']);
           //console.log(fecha);
           // Obtener la fecha actual
           var fechaActual = new Date();
           // Calcular la diferencia en milisegundos
           var diferencia = fechaActual - fecha;
           // Convertir la diferencia a días
           var dias = diferencia / (1000 * 60 * 60 * 24);
           //console.log(dias);


           if (dias < 5) {
             //Realiza el push si está resuelto y tiene menos de 5 días
             nombreCliente=traerNombreCliente(notasControl[i]['idcliente']);
             objeto.push({
               id : notasControl[i]['id'],
               idcliente : notasControl[i]['idcliente'],
               nombreCliente : nombreCliente,
               fecha_seguimiento : notasControl[i]['fecha_seguimiento'],
               seguimiento : notasControl[i]['seguimiento'],
               tarea : notasControl[i]['tarea'],
               resuelto : notasControl[i]['resuelto'],
               fechaResuelto : notasControl[i]['fechaResuelto'],
               papelera : notasControl[i]['papelera'],
             })
           }
         }else {
           //Realiza el push por defecto si no esta resuelto;
           nombreCliente=traerNombreCliente(notasControl[i]['idcliente']);
           objeto.push({
             id : notasControl[i]['id'],
             idcliente : notasControl[i]['idcliente'],
             nombreCliente : nombreCliente,
             fecha_seguimiento : notasControl[i]['fecha_seguimiento'],
             seguimiento : notasControl[i]['seguimiento'],
             tarea : notasControl[i]['tarea'],
             resuelto : notasControl[i]['resuelto'],
             fechaResuelto : notasControl[i]['fechaResuelto'],
             papelera : notasControl[i]['papelera'],
           })
         }
       }
     }
     //console.log(objeto);
     res.json(objeto);
   }else {
     res.send('LogOut');
   }

   function traerNombreCliente(id){
     const fs = require('fs')
     const path = require("path")
     const patJSON = path.join(__dirname, '../json/clientes.json')
     const readJSON =  () => {
     const data =  fs.readFileSync(patJSON, 'utf-8')
     return JSON.parse(data)
     }
     const {clientes} = readJSON()
     for (var i = 0; i < clientes.length; i++) {
       if (id==clientes[i]['id']) {
         return clientes[i]['nombre']
       }
    }
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


 app.put('/tareas', (req, res)=>{

   if (session()==true) {


     const id = req.body.id
     const campo = req.body.campo
     const dato = req.body.dato
     if (dato == 1) {
       fechaResuelto=new Date();
     }else {
       fechaResuelto='';
     }
     //res.send('entró al put, '+id+campo+dato)
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
         seguimientos[i][campo]=dato
         seguimientos[i]['fechaResuelto']=fechaResuelto
       }
     }
     const writeJSON =  (data) => {
        fs.writeFileSync(patJSON, JSON.stringify(data, null, 4), 'utf-8');
     }
     writeJSON({
       seguimientos: seguimientos,
     })
     console.log('Se ha modificado el id : '+id+' campo: '+campo+' dato: '+dato)

     res.json(seguimientos)


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


 app.put('/notas', (req, res)=>{

   if (session()==true) {


     const id = req.body.id
     const campo = req.body.campo
     const dato = req.body.dato
     if (dato == 1) {
       fechaResuelto=new Date();
     }else {
       fechaResuelto='';
     }
     //res.send('entró al put, '+id+campo+dato)
     const fs = require('fs');
     const path = require("path")
     const patJSON = path.join(__dirname, '../json/notasControl.json')
     const readJSON =  () => {
     const data =  fs.readFileSync(patJSON, 'utf-8')
     return JSON.parse(data)
     }
     const {notasControl} = readJSON()
     for (var i = 0; i < notasControl.length; i++) {
       if (notasControl[i]['id']==id) {
         notasControl[i][campo]=dato
         notasControl[i]['fechaResuelto']=fechaResuelto
       }
     }
     const writeJSON =  (data) => {
        fs.writeFileSync(patJSON, JSON.stringify(data, null, 4), 'utf-8');
     }
     writeJSON({
       notasControl: notasControl,
     })
     console.log('Se ha modificado el id : '+id+' campo: '+campo+' dato: '+dato)

     res.json(notasControl)


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


  app.delete("/notas", (req, res) =>{
    const id = req.body.id
    const fs = require('fs');
    const path = require("path")
    const patJSON = path.join(__dirname, '../json/notasControl.json')
    const readJSON =  () => {
    const data =  fs.readFileSync(patJSON, 'utf-8')
    return JSON.parse(data)
    }
    const {notasControl} = readJSON()
    for (var i = 0; i < notasControl.length; i++) {
      if (notasControl[i]['id']==id) {
        notasControl[i]['papelera']=1
      }
    }
    const writeJSON =  (data) => {
       fs.writeFileSync(patJSON, JSON.stringify(data, null, 4), 'utf-8');
    }
    writeJSON({
      notasControl: notasControl,
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
    console.log('El valor del checkbox back es: '+req.body.checkbox);
    if ('dataSeg' in req.body) {
      const dataSeg = req.body.dataSeg + ''
      const id_cliente = req.body.id_cliente + ''
      const checkbox = req.body.checkbox + ''
      var tarea = '0';
      if (checkbox=='true') {
        tarea='1';
      }
      console.log(checkbox);
      console.log(tarea);
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
          tarea: tarea,
          resuelto: 0,
          fechaResuelto : '',
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


  app.post('/notas', (req, res)=>{
    console.log(req.body.id_cliente);
    console.log(req.body.dataSeg);
    console.log('El valor del checkbox back es: '+req.body.checkbox);
    if ('dataSeg' in req.body) {
      const dataSeg = req.body.dataSeg + ''
      const id_cliente = req.body.id_cliente + ''
      const checkbox = req.body.checkbox + ''
      var tarea = '0';
      if (checkbox=='true') {
        tarea='1';
      }
      console.log(checkbox);
      console.log(tarea);
      const fecha = new Date();
      if (dataSeg == '') {
        console.log('campos vacios')
        res.send('campos vacios')
      }else {

        const fs = require('fs');
        const path = require("path")

        const patJSON = path.join(__dirname, '../json/notasControl.json')

        const readJSON =  () => {
          const data =  fs.readFileSync(patJSON, 'utf-8')
          return JSON.parse(data)
        }

        const writeJSON =  (data) => {
           fs.writeFileSync(patJSON, JSON.stringify(data, null, 4), 'utf-8');
        }

        const {notasControl} = readJSON()
        const n = notasControl.length
        notasControl.push({
          id : n+1,
          idcliente : id_cliente,
          fecha_seguimiento : fecha,
          seguimiento : dataSeg,
          tarea: tarea,
          resuelto: 0,
          fechaResuelto : '',
          papelera : 0
        })

        writeJSON({
          notasControl: notasControl,
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



  app.get('/backup', function (req, res) {
    //console.log('tareas back');
    if (session()==true) {

      const fs = require('fs')
      const path = require("path")

      const patJSON1 = path.join(__dirname, '../json/clientes.json')
      const readJSON1 =  () => {
      const data1 =  fs.readFileSync(patJSON1, 'utf-8')
      return JSON.parse(data1)
      }

      const patJSON2 = path.join(__dirname, '../json/seguimientos.json')
      const readJSON2 =  () => {
      const data2 =  fs.readFileSync(patJSON2, 'utf-8')
      return JSON.parse(data2)
      }

      const patJSON3 = path.join(__dirname, '../json/notasControl.json')
      const readJSON3 =  () => {
      const data3 =  fs.readFileSync(patJSON3, 'utf-8')
      return JSON.parse(data3)
      }

      const objetoBackup = []

      objetoBackup.push(
          readJSON1(),
          readJSON2(),
          readJSON3()
      )

      //console.log(objeto);
      res.json(objetoBackup);
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





  // Define el intervalo de tiempo en segundos
  const intervalo = 4 * 60 * 1000; // 4minutos

  setInterval(async () => {
      try {
          //const response = await axios.get('http://localhost:4000/ping');
          const response = await axios.get('https://demonget.onrender.com/ping');
          console.log(`Petición realizada a las ${moment().tz('America/Bogota').format('HH:mm:ss DD-MM-YYYY')}`);
          console.log(response.data);
      } catch (error) {
          console.log(`Error al realizar la petición a las ${moment().tz('America/Bogota').format('HH:mm:ss DD-MM-YYYY')}`);
          console.error(error);
      }
  }, intervalo);

  app.get('/ping', function (req, res) {
      res.send('pong');
  })


  app.get('/ultimaFecha', function(req, res){
  const fs = require('fs');
  const path = require("path");
  const filepath = path.join(__dirname, '../json/ultimaFecha.txt');

  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el archivo');
    } else {
      res.send(data);
    }
  });
});


app.post('/ultimaFecha', function(req, res){
  const nuevaFecha = req.body.nuevaFecha
  const fs = require('fs');
  const path = require("path");
  const filepath = path.join(__dirname, '../json/ultimaFecha.txt');

  //const newDate = 'Sat Apr 06 2024 23:45:00 GMT-0500 (hora estándar de Colombia)';
  const newDate = nuevaFecha;

  fs.writeFile(filepath, newDate, 'utf8', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al escribir en el archivo');
    } else {
      res.send('ok');
    }
  });
});



app.post('/seguimientos/subnota', (req, res) => {
  const { id, subNota } = req.body;

  const fs = require('fs');
  const path = require("path");
  const patJSON = path.join(__dirname, '../json/seguimientos.json');

  const readJSON = () => {
    const data = fs.readFileSync(patJSON, 'utf-8');
    return JSON.parse(data);
  };

  const writeJSON = (data) => {
    fs.writeFileSync(patJSON, JSON.stringify(data, null, 4), 'utf-8');
  };

  const { seguimientos } = readJSON();

  const seguimientoIndex = seguimientos.findIndex(seguimiento => seguimiento.id === parseInt(id));

  if (seguimientoIndex !== -1) {
    if (!seguimientos[seguimientoIndex].subnota) {
      seguimientos[seguimientoIndex].subnota = [];
    }

    seguimientos[seguimientoIndex].subnota.push(subNota);

    writeJSON({
      seguimientos: seguimientos,
    });

    console.log(`Se ha agregado la subNota "${subNota}" al seguimiento con ID ${id}`);
    res.send('ok');
  } else {
    console.log(`No se encontró el seguimiento con ID ${id}`);
    res.status(404).send('No se encontró el seguimiento');
  }
});



}
module.exports=ruta_control
