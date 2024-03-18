function ruta_pvp(app){
console.log('pasó por pvp');
const body_parser = require('body-parser')
app.use(body_parser.urlencoded({extended:true}))

  app.get('/pvp', function (req, res) {
     res.render('pvp')
  });



}
module.exports=ruta_pvp
