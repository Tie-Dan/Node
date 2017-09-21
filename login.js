/**
 * Created by suenpeng on 2017/3/8.
 */
const express=require('express');
const static=require('express-static');
const mysql=require('mysql');
let server=express();
server.listen(4000);
//连接数据库
let db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'2017',
});
//注册:
server.get('/add',(req,res)=>{
    let username=req.query.username;
    let password=req.query.password;
    db.query(`select * from users where username='${username}'`,(err,data)=>{
        if (err){
            res.send({err:1,msg:'数据库查询错误'});
            res.end();
        }else{
            if (data.length>0){
                res.send({err:1,msg:'用户名已存在'});
                res.end();
            }else{
                db.query(`insert into users values (0,'${username}','${password}')`,(err,data)=>{
                    if (err){
                        res.send({err:1,msg:'添加失败'});
                        res.end();
                    }else{
                        res.send({err:0});
                        res.end();
                    }
                })
            }
        }
    })
});
//登陆:
server.get('/login',(req,res)=>{
    db.query(`select * from users where username='${req.query.username}'`,(err,data)=>{
        if (err){
            res.send({err:1,msg:'链接数据库失败'});
            res.end();
        }else{
            if (data.length==0){
                res.send({err:1,msg:'没有这个人'});
                res.end();
            }else{
                if(data[0].password==req.query.password){
                    res.send({err:0});
                    res.end();
                }else{
                    res.send({err:1,msg:'用户名或者密码错误'});
                    res.end();
                }
            }
        }
    })
})
server.use(express.static('www'));