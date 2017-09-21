/**
 * Created by tiedan on 2017/6/13.
 */
const express = require('express');
const  mysql = require('mysql');
let server = express();
    server.listen(4000);
let db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123',
    database:'darr'
});
server.get(`/getUser`,(req,res)=>{
    db.query(`select * from users`,(err,data)=>{
        if(err){
            res.send({err:true,msg:"数据库错了"});
            res.end();
        }else{
            res.send({err:false,data});
            res.end();
        }
    })
});
server.use(express.static('www'));