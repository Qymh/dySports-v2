var express=require('express')
var http=require('http')
var bodyParser=require('body-parser') // 数据接收
var router=require('./config/router') // 路由管理

var app=express()

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
})

app.use(bodyParser.json()) // json接受
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',router) // 路由设置

http.createServer(app).listen(7777)

