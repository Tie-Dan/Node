/**
 * Created by tiedan on 2017/7/5.
 */
const express = require("express");
const static = require("express-static");
const mysql = require("mysql");
let server = express();
server.listen(5000);
let db=mysql.createConnection({
 host:'localhost',
 user:'root',
 password:'123',
 database:'haha'
 });
/*增加一条数据*/
server.get(`/add`,(req,res)=>{
    let name=req.query.name;
    let age=req.query.age;
    if(name&&age){
        let sql=`insert into users values ('${name}','${age}',0)`;
        db.query(sql,(err,data)=>{
            if(err){
                res.send({err:1,msg:"数据库有问题"});
                res.end();
            }else{
                res.send({
                    err:0,
                    msg:"添加成功"
                });
                res.end();
            }
        })
    }
});
/*获取数据*/
server.get(`/getData`,(req,res)=>{
  let sql=`select * from users`;
  db.query(sql,(err,data)=>{
     if(err){
        res.send({err:1,msg:"请求数据失败"});
        res.end();
     }else{
        res.send(data);
        res.end();
     }
  })
});
/*删除一条数据*/
server.get(`/det`,(req,res)=>{
  let n=req.query.n;
  let sql=`delete from users where id='${n}'`;
  db.query(sql,(err,data)=>{
     if (err){
       res.send({err:1,msg:"数据库删除失败"});
       res.end(); 
     }else{
       res.send({err:0,msg:"牛x了"});
       res.end();
     }
  })
});
server.use(express.static('www'));
