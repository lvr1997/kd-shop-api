//数据库模块
const db = require('../db/index')

//获取分类列表
exports.getCategoryList = (req, res) => {
    const sql = 'select * from category where status=1 order by id asc'
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取文章分类列表成功！',
            data: results,
        })
    })

}

//新增分类
exports.addCategory = (req, res) => {
    //判断用户角色
    // if (req.user.userRole === 1) return res.cc("您无权限操作！")
    // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
    const sql = `select * from category where name=? or alias=?`
    // 执行查重操作
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 分类名称 和 分类别名 都被占用
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        // 分类名称 或 分类别名 被占用
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

        // TODO：新增分类
        const sql2 = `insert into category set ?`
        db.query(sql2, req.body, (err, results) => {
            // SQL 语句执行失败
            if (err) return res.cc(err)

            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('新增分类失败！')

            // 新增文章分类成功
            res.cc('新增分类成功！', 0)
        })


    })

}