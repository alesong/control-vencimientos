function ruta_test(app, pool){
  app.get('/test', async function(req, res){
    var sql ='SELECT * FROM pacientes WHERE id_paciente = 1';
    var [resDB] = await pool(sql);
    console.log(resDB);
    var dato = resDB[0]['nombre_paciente'];
    res.render('test', {dato:dato});
  })

}
module.exports=ruta_test
