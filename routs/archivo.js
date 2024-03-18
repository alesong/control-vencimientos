const express=require('express');
const router=express.Router();
  router.get('/archivo', function (req, res) {
    res.sendFile("./public/img/favicon.ico",{root:__dirname});
  });
module.exports=router
