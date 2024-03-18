function ruta_controlPVP(app){
console.log('pasó por control PVP');
const body_parser = require('body-parser')
app.use(body_parser.urlencoded({extended:true}))



  app.get('/loadpvp', (req, res)=>{
    const fs = require('fs');
    const path = require("path")
    const patJSON = path.join(__dirname, '../json/score.json')
    const readJSON =  () => {
    const data =  fs.readFileSync(patJSON, 'utf-8')
    return JSON.parse(data)
    }
    const objeto = []
    const {score} = readJSON()
    for (var i = 0; i < score.length; i++) {

      id = score[i]['id']
      puntaje1 = score[i]['puntaje1']
      nombre1 = score[i]['nombre1']
      puntaje2 = score[i]['puntaje2']
      nombre2 = score[i]['nombre2']
      estrella = score[i]['estrella']
      visible = score[i]['visible']

      if (1 == 1) {
        objeto.push({
          id : id,
          puntaje1 : puntaje1,
          nombre1 : nombre1,
          puntaje2 : puntaje2,
          nombre2 : nombre2,
          estrella : estrella,
          visible : visible
        })

      }
    }
    res.json(score)
  })





  app.put('/updatepvp', (req, res)=>{
    const id = req.body.id
    var campo = req.body.campo
    const dato = req.body.dato
    //res.send('entró al put, '+id+campo+dato)

    const fs = require('fs');
    const path = require("path")
    const patJSON = path.join(__dirname, '../json/score.json')
    const readJSON =  () => {
    const data =  fs.readFileSync(patJSON, 'utf-8')
    return JSON.parse(data)
    }
    const {score} = readJSON()
    for (var i = 0; i < score.length; i++) {
      if (score[i]['id']==id) {
        if (campo==i+"Anum") {campo="puntaje1"}
        if (campo==i+"Bnum") {campo="puntaje2"}
        if (campo==i+"Aname") {campo="nombre1"}
        if (campo==i+"Bname") {campo="nombre2"}
        score[i][campo]=dato
      }
    }
    const writeJSON =  (data) => {
       fs.writeFileSync(patJSON, JSON.stringify(data, null, 4), 'utf-8');
    }
    writeJSON({
      score:score,
    })
    var msn='Se ha modificado el id : '+id+' campo: '+campo+' dato: '+dato
    console.log(msn)
    res.send(msn)

  })



  app.put('/updatestar', (req, res)=>{
    const id = req.body.id
    var campo = req.body.campo
    //res.send('entró al put, '+id+campo+dato)

    const fs = require('fs');
    const path = require("path")
    const patJSON = path.join(__dirname, '../json/score.json')
    const readJSON =  () => {
    const data =  fs.readFileSync(patJSON, 'utf-8')
    return JSON.parse(data)
    }
    const {score} = readJSON()
    for (var i = 0; i < score.length; i++) {
      if (score[i]['id']==id) {

        var antes=score[i]['estrella']
        if (antes==0) {var despues=1}
        if (antes==1) {var despues=0}
        score[i]['estrella']=despues
      }
    }
    const writeJSON =  (data) => {
       fs.writeFileSync(patJSON, JSON.stringify(data, null, 4), 'utf-8');
    }
    writeJSON({
      score:score,
    })
    var msn='Se ha modificado el id : '+id+' campo: '+despues
    console.log(msn)
    res.send(msn)

  })



  app.put('/updatevisible', (req, res)=>{
    const id = req.body.id
    var campo = req.body.campo
    //res.send('entró al put, '+id+campo+dato)

    const fs = require('fs');
    const path = require("path")
    const patJSON = path.join(__dirname, '../json/score.json')
    const readJSON =  () => {
    const data =  fs.readFileSync(patJSON, 'utf-8')
    return JSON.parse(data)
    }
    const {score} = readJSON()
    for (var i = 0; i < score.length; i++) {
      if (score[i]['id']==id) {

        var antes=score[i]['visible']
        if (antes==0) {var despues=1}
        if (antes==1) {var despues=0}
        score[i]['visible']=despues
      }
    }
    const writeJSON =  (data) => {
       fs.writeFileSync(patJSON, JSON.stringify(data, null, 4), 'utf-8');
    }
    writeJSON({
      score:score,
    })
    var msn='Se ha modificado el id : '+id+' campo: '+despues
    console.log(msn)
    res.send(msn)

  })






}
module.exports=ruta_controlPVP
