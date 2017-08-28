var express=require('express')
var router=express.Router()
var nodemailer = require('nodemailer') // 邮箱

module.exports=router

router.post('/homeInformation',function(req,res,next){
    var data=req.body
    var name=data.userName // 用户姓名
    var school=data.schoolName // 学校名称
    var address=data.address // 地址
    var tel=data.mobile // 手机
    var content=data.content // 留言
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        port: 465,
        secure: true, // secure:true for port 465, secure:false for port 587
        auth: {
            user: '27508492@qq.com',
            pass: 'tfotxiihgbdmbijb'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '27508492@qq.com', // sender address
        to: '415570450@qq.com', // list of receivers
        subject: '动跃体育教学管理系统 免费使用 用户信息', // Subject line
        text: `
            姓名:${name}
            学校:${school}
            地址:${address}
            手机:${tel}
            留言:${content}
        `
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
})

router.post('/agentInformation',function(req,res,next){
    var data=req.body

    var name=data.userName // 用户姓名
    var tel=data.mobile // 手机
    var company=data.company // 公司名字
    var email=data.email // 邮件
    var province=data.province //省
    var city=data.city // 市
    var content=data.content // 留言

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        port: 465,
        secure: true, // secure:true for port 465, secure:false for port 587
        auth: {
            user: '27508492@qq.com',
            pass: 'tfotxiihgbdmbijb'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '27508492@qq.com', // sender address
        to: '415570450@qq.com', // list of receivers
        subject: '动跃体育申请代理', // Subject line
        text: `
            姓名:${name}
            手机:${tel}
            公司名字:${company}
            邮箱:${email}
            目标地址:${province}-${city}
            留言:${content}
        `
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
})