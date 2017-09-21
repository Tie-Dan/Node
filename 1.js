/**
 * Created by tiedan on 2017/6/13.
 */
const express = require('express');
let server=express();
server.listen(4000);//监听端口
server.get('/add',(request,response)=>{
    response.send('helloword1');
    Response.end();
})