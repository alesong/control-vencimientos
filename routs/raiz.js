function ruta_raiz(app){
  app.get('/', function (req, res) {
    res.render('index', { titulo: 'Hey', parrafo: 'Hello there!'}); // primer parametro es nombre del archivo vista, el segundo parametro entre {} son kas variables que inclulle en la vista
  });
}
module.exports=ruta_raiz
