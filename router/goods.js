/**
 * 物品
 */
const express = require('express');
const router = express.Router();
const expressJoi = require('@escook/express-joi')

//导入路由处理模块
const { getCategoryList,addCategory,deleteCategory,getCategoryById,updateCategory } = require('../router_handler/goods')

const { add_cate_schema,delete_cate_schema,update_cate_schema } = require('../schema/goods')


//获取物品分类列表
router.get('/categoryList', getCategoryList)

//新增分类
router.post('/categoryAdd', expressJoi(add_cate_schema), addCategory)

//删除分类
router.get('/categoryDel/:id', expressJoi(delete_cate_schema), deleteCategory)

//根据id查询
router.get('/categoryById/:id', expressJoi(delete_cate_schema), getCategoryById)

//更新分类信息
router.post('/categoryUpdate/:id', expressJoi(update_cate_schema), updateCategory)

module.exports = router;