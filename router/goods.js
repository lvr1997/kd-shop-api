const express = require('express');
const router = express.Router();
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
// 设置图片存储路径
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        let fileData = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
        cb(null, file.fieldname + "-" + fileData)
    }
})

const upload = multer({
    storage: storage
})


//路由处理模块
const goodsHandler = require('../router_handler/goods')
// 导入验证模块
const { add_goods_schema, detail_goods_schema } = require('../schema/goods')

//上传闲置物品图片
router.post('/upload', upload.array('goods_image', 5),goodsHandler.uploadImages)

//发布闲置
router.post('/add', expressJoi(add_goods_schema), goodsHandler.addGoods)

//查询详情
router.get('/detail/:id', expressJoi(detail_goods_schema), goodsHandler.detail)

module.exports = router;