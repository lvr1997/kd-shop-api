const express = require('express');
const router = express.Router();

// 导入用户信息的处理函数模块
const userinfoHandler = require('../router_handler/userinfo')

const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

// 获取用户的基本信息
router.get('/userinfo', userinfoHandler.getUserInfo)

//修改个人信息
router.post('/updateInfo', expressJoi(update_userinfo_schema), userinfoHandler.updateInfo)

//修改密码
router.post('/updatePwd', expressJoi(update_password_schema), userinfoHandler.updatePwd)

// 上传头像
router.post('/avatarUpload', expressJoi(update_avatar_schema), userinfoHandler.uploadAvatar)

module.exports = router;