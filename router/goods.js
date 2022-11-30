/**
 * 物品
 */
const express = require('express');
const router = express.Router();
const expressJoi = require('@escook/express-joi')

//导入路由处理模块
const { getCategoryList,addCategory } = require('../router_handler/goods')

const { add_cate_schema } = require('../schema/goods')


//获取物品分类列表
router.get('/categoryList', getCategoryList)

//新增分类
router.post('/categoryAdd', expressJoi(add_cate_schema), addCategory)

module.exports = router;