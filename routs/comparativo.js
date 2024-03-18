function ruta_comparativo(app){
console.log('pasó por comparativo');
const body_parser = require('body-parser')
app.use(body_parser.urlencoded({extended:true}))

  app.get('/comparativo', function (req, res) {
     res.render('comparativo')
  });



}
module.exports=ruta_comparativo
