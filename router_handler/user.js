//数据库模块
const db = require('../db/index')
//密码加密
const { getPassword } = require('../utils/md5Util')
//工具类 获取系统时间、手机号隐藏中间4位
const { getDate19, getPhone } = require('../utils/tools')
//生成uuid
const uuid = require('node-uuid');
//生成jwt token
const jwt = require('jsonwebtoken')
//导入全局配置
const config = require('../config')

//注册
exports.regUser = (req, resp) => {
    let roleId = 1
    //接收参数
    const userInfo = req.body
    //根据手机号查找用户,判断用户是否被占用
    const sql = 'SELECT user_id as userId,username FROM user WHERE phone= ? AND status = 1'
    db.query(sql, [userInfo.phone], function (err, results) {
        //执行SQL语句失败
        if (err) {
            return resp.cc(err)
        }
        //用户名被占用
        if (results.length > 0) {
            return resp.cc("手机号已注册过，请登更换其他手机号！")
        } else {
            //对密码进行加密
            userInfo.password = getPassword(userInfo.password)
            let usernn = getPhone(userInfo.phone)
            //执行插入数据库操作
            const sql2 = `INSERT INTO user (user_id,phone,username,password,create_at,user_role,user_school) values ("${uuid()}","${userInfo.phone}","${usernn}","${userInfo.password}","${getDate19()}",${roleId},"${userInfo.userSchool}")`
            db.query(sql2, (err, result) => {
                if (err) return resp.cc(err);
                if (result.affectedRows !== 1) {
                    return resp.cc("注册用户失败，请稍后再试！")
                } else {
                    return resp.cc("注册成功", 0)
                }
            })
        }
    })

}

//登录
exports.login = (req, resp) => {
    //接收参数
    let { phone, password, verifyCode } = req.body;
    //先验证验证码
    if(verifyCode.toLowerCase() !== req.cookies.captcha) {
        return resp.cc("验证码输入错误")
    }
    //sql
    let sql = 'SELECT user_id as userId, username, phone, password, birthday, sex, img_url as imgUrl, residence, user_role as userRole, user_school as userSchool FROM user WHERE phone=? AND status=1'
    db.query(sql, phone, function (err, rows) {
        // 执行 SQL 语句失败
        if (err) return resp.cc(err)
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (rows.length !== 1) return resp.cc('用户不存在，登录失败！')
        // 判断用户输入的登录密码是否和数据库中的密码一致
        let compareResult = getPassword(password) == rows[0].password
        if(!compareResult) {
            return resp.cc('密码错误，登录失败！')
        }
        //生成JWT的token字符串
        const user = { ...rows[0], password: '', imgUrl: '', phone: getPhone(rows[0].phone) }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn})
        resp.send({
            status: 0,
            message: "登录成功！",
            token: 'Bearer ' + tokenStr, // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
        })
    })
    
}