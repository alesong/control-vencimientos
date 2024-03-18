function ruta_recordsA2G(app){
console.log('pasó por recordsA2G');
const body_parser = require('body-parser')
app.use(body_parser.urlencoded({extended:true}))

  app.get('/recordsA2G', function (req, res) {
     res.render('recordsA2G')
  });



}
module.exports=ruta_recordsA2G
