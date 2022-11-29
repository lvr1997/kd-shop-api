const express = require('express');
const router = express.Router();
const userHandler = require('../router_handler/user')

//导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2.导入需要验证的模块
const { reg_login_schema } = require('../schema/user')

//登录
router.post('/login', expressJoi(reg_login_schema), userHandler.login);

//注册
router.post('/register', expressJoi(reg_login_schema), userHandler.regUser)

// 上传头像
// router.post('/avatarUpload', userHandler.uploadAvatar)

module.exports = router;