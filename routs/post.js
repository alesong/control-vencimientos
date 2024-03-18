const express=require('express');
var router=express.Router();
const axios = require('axios');
router.get('/post/', function(req, res){
  res.send('Falta colocar un parametro despues de /');
});
router.get('/post/:parametro', async function(req, res){ //el parametro despues de los dos puntos se comporta como una variabl
  console.log(req.params);
  const respuesta=await axios.get('https://jsonplaceholder.typicode.com/posts')  //  Consulta un servidor externo
  console.log(respuesta);
  res.render('post',{'parametro':req.params['parametro'],'respuesta':respuesta.data});
});
module.exports=router
