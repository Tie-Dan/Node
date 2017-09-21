/**
 * Created by tiedan on 2017/6/13.
 */
const express = require('express');
let server = express();
server.listen(4000);
server.get('/getUser',(req,res)=>{
        res.send({error:0,data:[
            {name:"张三",job:"搬砖"},
            {name:"李四",job:"和泥"}
        ]});
        res.end()
});
server.use(express.static('www'));