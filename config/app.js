const express = require('express');
const app = new express();
const http = require("http");
const bodyParser = require('body-parser');


// 处理body数据
app.use(bodyParser.json());
//对urlencoded请求体解析中间件,extended:true 高级模式 false:普通 没有区别
app.use(bodyParser.urlencoded({ extended: true }));


// 允许跨域请求
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    // res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method === "OPTIONS") res.send(200); /*让options请求快速返回*/
    else  next();
  });
  

// Create service
http.createServer(app).listen(8888);




module.exports = {
  app,
  express
};