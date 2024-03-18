function ruta_guardarPersona(app){
console.log('pasó por control');
const body_parser = require('body-parser')
app.use(body_parser.urlencoded({extended:true}))



  app.get('/guardarPersona', (req, res)=>{
    const fs = require('fs');
    const path = require("path")
    const patJSON = path.join(__dirname, '../json/clientes_mantenimiento.json')
    const readJSON =  () => {
    const data =  fs.readFileSync(patJSON, 'utf-8')
    return JSON.parse(data)
    }
    const objeto = []
    const {clientes} = readJSON()
    for (var i = 0; i < clientes.length; i++) {

      id = clientes[i]['id']
      fecha = clientes[i]['fecha']
      nombre = clientes[i]['nombre']
      cel = clientes[i]['cel']
      marca = clientes[i]['marca']
      serial = clientes[i]['serial']
      observaciones = clientes[i]['observaciones']
      precio = clientes[i]['precio']
      papelera = clientes[i]['papelera']

      if (papelera == 0) {
        objeto.push({
          id : id,
          fecha : fecha,
          nombre : nombre,
          cel : cel,
          marca : marca,
          serial : serial,
          observaciones : observaciones,
          precio : precio
        })

      }
    }
    res.json(objeto)
  })



  app.post('/guardarPersona', (req, res)=>{
    if ('nombre' in req.body) {
      const nombre = req.body.nombre + ''
      const cel = req.body.cel + ''
      const marca = req.body.marca + ''
      const serial = req.body.serial + ''
      const observaciones = req.body.observaciones + ''
      const precio = req.body.precio + ''
      if (nombre == '') {
        console.log('campos vacios')
        res.send('campos vacios')
      }else {

        const fs = require('fs');
        const path = require("path")

        const patJSON = path.join(__dirname, '../json/clientes_mantenimiento.json')

        const readJSON =  () => {
          const data =  fs.readFileSync(patJSON, 'utf-8')
          return JSON.parse(data)
        }

        const writeJSON =  (data) => {
           fs.writeFileSync(patJSON, JSON.stringify(data, null, 4), 'utf-8');
        }

        const {clientes} = readJSON()
        fecha = new Date()
        const n = clientes.length
        clientes.push({
          id : n+1,
          fecha : fecha,
          nombre : nombre,
          cel : cel,
          marca : marca,
          serial : serial,
          observaciones : observaciones,
          precio : precio,
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
    res.send('ok post')

  })




  app.put('/guardarPersona', (req, res)=>{
    const id = req.body.id
    const campo = req.body.campo
    const dato = req.body.dato
    //res.send('entró al put, '+id+campo+dato)
    const fs = require('fs');
    const path = require("path")
    const patJSON = path.join(__dirname, '../json/clientes_mantenimiento.json')
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

  })


  app.delete("/guardarPersona", (req, res) =>{
    const id = req.body.id
    const fs = require('fs');
    const path = require("path")
    const patJSON = path.join(__dirname, '../json/clientes_mantenimiento.json')
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
    res.send('ok')
  })






}
module.exports=ruta_guardarPersona
