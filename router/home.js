/**
 * 不需要登录验证的接口
 */
 var express = require('express');
 var router = express.Router();
 const captchaHandler = require('../router_handler/captcha')
 
 router.get('/captcha', captchaHandler.getCaptcha)
 
 module.exports = router; 

//首页商品、轮播图、分类