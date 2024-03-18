function ruta_rangosa2g(app){
console.log('pasó por rangosa2g');
const body_parser = require('body-parser')
app.use(body_parser.urlencoded({extended:true}))

  app.get('/rangosa2g', function (req, res) {
     res.render('rangosa2g')
  });



}
module.exports=ruta_rangosa2g
