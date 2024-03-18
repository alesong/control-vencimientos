function ruta_pvpedit(app){
console.log('pasó por pvpedit');
const body_parser = require('body-parser')
app.use(body_parser.urlencoded({extended:true}))

  app.get('/pvpedit', function (req, res) {
     res.render('pvpedit')
  });



}
module.exports=ruta_pvpedit
