const db = require('../db/index')
const { getPassword } = require('../utils/md5Util')
const { getDate19, phone } = require('../utils/tools')
const uuid = require('node-uuid');

//注册
exports.regUser = (req, resp) => {
    let roleId = 1
    if (req.body.token) {
        //存在token说明是管理员在添加后台系统用户
        roleId = 2
    }
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
            let usernn = phone(userInfo.phone)
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
    //sql
    let sql = 'SELECT user_id as userId, username, user_email as userEmail, birthday, sex, img_url as imgUrl, residence, user_role as userRole, user_school as userSchool FROM user WHERE phone=? AND status=1'
    
}