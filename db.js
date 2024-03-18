const mysql = require('mysql2/promise')


async function pool(sql){
  const connection = await mysql.createPool({
    //host:'192.168.1.217',
    //user:'Architect02',
    //password:'@DM1N1STR4D0R2016',
    host:'localhost',
    user:'root',
    password:'',
    database:'historia_clinica',
  //  ssl: {
  //    rejectUnauthorized: false
  //  }
  })
  if (resultado = await connection.query(sql)) {
    return(resultado);
  }else {
    return('Error')
  }


}
module.exports=pool
