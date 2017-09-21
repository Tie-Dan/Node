/**
 * Created by tiedan on 2017/6/13.
 */
const express = require('express');
let server = express();
server.listen(4000);
server.get('/getUser',(req,res)=>{
        res.send([1,2,3]);
        res.end()
});
//设置静态文件
server.use(express.static('www'));