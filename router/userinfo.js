const express = require('express');
const router = express.Router();

// 导入用户信息的处理函数模块
const userinfoHandler = require('../router_handler/userinfo')

// 获取用户的基本信息
router.get('/userinfo', userinfoHandler.getUserInfo)
// 上传头像
// router.post('/avatarUpload', userHandler.uploadAvatar)

module.exports = router;