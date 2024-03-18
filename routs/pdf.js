function ruta_pdf(app){
console.log('pasó por pdf');
const body_parser = require('body-parser')
app.use(body_parser.urlencoded({extended:true}))

  app.get('/pdf/:id', function (req, res) {
    const id_pdf = req.params['id']

    const objeto = leer_archivo(id_pdf)
    console.log(objeto);
    //res.json(objeto)
    res.render('pdf')
  });



}

module.exports=ruta_pdf


//------------------------------inicio funcion para leer archivo-----------------

function leer_archivo(id_pdf){

  const fs = require('fs');
  const path = require("path")
  const patJSON = path.join(__dirname, '../clientes_mantenimiento.json')
  const readJSON =  () => {
  const data =  fs.readFileSync(patJSON, 'utf-8')
  return JSON.parse(data)
  }
  const objeto = []
  const {clientes} = readJSON()
  for (var i = 0; i < clientes.length; i++) {



    if (id_pdf == clientes[i]['id']) {
      id = clientes[i]['id']
      fecha = clientes[i]['fecha']
      nombre = clientes[i]['nombre']
      cel = clientes[i]['cel']
      marca = clientes[i]['marca']
      serial = clientes[i]['serial']
      observaciones = clientes[i]['observaciones']
      precio = clientes[i]['precio']
      papelera = clientes[i]['papelera']
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
  return objeto
}
