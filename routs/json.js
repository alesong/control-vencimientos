function ruta_json(app){
  app.get('/json', function (req, res) {
    res.json({
      "Nombre":"Aleson",
      "Apellido":"Garcia"
    });
  });
}
module.exports=ruta_json
