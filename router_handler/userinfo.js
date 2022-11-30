// 导入数据库操作模块
const db = require('../db/index')

const { getPassword } = require('../utils/md5Util')

//获取用户信息
exports.getUserInfo = (req, resp) => {
    // 根据用户的 id，查询用户的基本信息
    // 注意：为了防止用户的密码泄露，需要排除 password 字段
    const sql = `select user_id as userId, username, phone, birthday, sex, img_url as imgUrl, residence, user_role as userRole, user_school as userSchool from user where user_id=?`
    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    db.query(sql, req.user.userId, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return resp.cc(err)

        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1) return resp.cc('获取用户信息失败！')

        // 3. 将用户信息响应给客户端
        resp.send({
            status: 0,
            message: '获取用户基本信息成功！',
            data: results[0],
        })
    })
}

//修改用户信息(修改自己的)
exports.updateInfo = (req, resp) => {
    //修改用户名、生日、性别、个性签名信息
    // const { username, birthday, sex, residence } = req.body
    const sql = `update user set ? where user_id=?`
    db.query(sql, [req.body, req.user.userId], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return resp.cc(err)

        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return resp.cc('修改用户基本信息失败！')

        // 修改用户信息成功
        return resp.cc('修改用户基本信息成功！', 0)
    })
}

//处理修改密码
exports.updatePwd = (req, res) => {
    // 定义根据 id 查询用户数据的 SQL 语句
    const sql = `select * from user where user_id=?`

    // 执行 SQL 语句查询用户是否存在
    db.query(sql, req.user.userId, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 检查指定 id 的用户是否存在
        if (results.length !== 1) return res.cc('用户不存在！')

        // 判断提交的旧密码是否正确
        const compareResult = getPassword(req.body.oldPwd) === results[0].password
        if (!compareResult) return res.cc("旧密码不正确！")
        //将新密码提交至数据库中保存
        const sql2 = `update user set password=? where user_id=?`
        const newPwd = getPassword(req.body.newPwd)
        // 执行 SQL 语句，根据 id 更新用户的密码
        db.query(sql2, [newPwd, req.user.userId], (err, results) => {
            // SQL 语句执行失败
            if (err) return res.cc(err)

            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('更新密码失败！')

            // 更新密码成功
            res.cc('更新密码成功！', 0)
        })

    })
}