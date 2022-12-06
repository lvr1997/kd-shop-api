// 导入定义验证规则的模块
const joi = require('joi')

//定义验证规则
//闲置名称
const name = joi.string().min(2).max(20).required().error(new Error("请输入闲置物品名称，长度在2~20个字符"))
//分类id 用户界面下拉框选择
const cate_id = joi.number().integer().min(1).required()
//物品描述
const describle = joi.string().required().allow('')
//出售价格
const price = joi.number().integer().min(1).required().error(new Error("请输入正确的物品价格！"))
//原价格
const real_price = joi.number().integer().min(1).required().error(new Error("请输入正确的物品价格！"))
const good_address = joi.string().min(5).max(50).required().error(new Error("请输入交易地址，长度在5~50个字符"))
const view_count = joi.number().integer().min(1).required().error(new Error("请选择正确的数量！"))

const id = joi.number().integer().min(1).required()

exports.add_goods_schema = {
    body: {
        name,
        cate_id,
        describle,
        price,
        real_price,
        good_address,
        view_count
    },
}

exports.detail_goods_schema = {
    params: {
        id
    },
}