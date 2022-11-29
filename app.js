const express = require('express');
const cors = require('cors')
const path = require('path')
const joi = require('joi')

const homeRouter = require('./router/home');
const userRouter = require('./router/user');

const app = express()

//允许跨域
app.use(cors())

//请求参数处理
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

/**
 * 注册路由
 */
//  app.use('/', homeRouter);
 app.use('/user', userRouter);


 /**
  * 全局错误处理
  */
app.use(function(err, req, res, next) {
    if(err instanceof joi.ValidationError) return res.cc(err)
    res.cc(err)
})

 app.listen(3000, function () {
    console.log('Server is starting on http://localhost:3000')
 })