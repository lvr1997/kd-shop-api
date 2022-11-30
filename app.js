const express = require('express');
const cors = require('cors') //跨域支持
const path = require('path')
const joi = require('joi') //表单验证
const cookieParser = require('cookie-parser'); //解析客户端传过来的cookie

const config = require('./config') //全局配置

// 解析 token 的中间件
const expressJWT = require('express-jwt')

//导入路由
const homeRouter = require('./router/home');
const userRouter = require('./router/user');
const userInfoRouter = require('./router/userinfo')

const app = express()

//允许跨域
app.use(cors())

//请求参数处理
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//静态资源处理
app.use(express.static(path.join(__dirname, 'public')));

// 响应数据的中间件
app.use(function (req, res, next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function (err, status = 1) {
        res.send({
            // 状态
            status,
            // 状态描述，判断 err 是 错误对象 还是 字符串
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: ['/user','/home'] }))

/**
 * 注册路由
 */
 app.use('/home', homeRouter);
 app.use('/user', userRouter);
 app.use('/my', userInfoRouter);


 /**
  * 全局错误处理
  */
app.use(function(err, req, res, next) {
    if(err instanceof joi.ValidationError) return res.cc(err)
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    res.cc(err)
})

 app.listen(3000, function () {
    console.log('Server is starting on http://localhost:3000')
 })