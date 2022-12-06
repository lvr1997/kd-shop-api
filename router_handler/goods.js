const db = require('../db/index')
const path = require('path')

let goodsImages = []

//uploadImages
exports.uploadImages = (req, res) => {
   // console.log(req.files);
   // 手动判断是否上传了图片
   if (req.files.length === 0) return res.cc('请上传物品图片！')
   if (req.files.length > 5) return res.cc("最多允许上传5张图片！")

   for (let i = 0; i < req.files.length; i++) {
      goodsImages.push(path.join('/public/uploads', req.files[i].filename))
   }

   res.cc("图片上传成功",0)
}

//新增物品
exports.addGoods = (req, res) => {
   const goodsInfo = {
      ...req.body,
      first_image: goodsImages[0],
      publish_time: new Date(),
      user_id: req.user.userId,
      status: 1
   }
   const sql = `insert into goods set ?`
   // 执行 SQL 语句
   db.query(sql, goodsInfo, (err, results) => {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)

      // 执行 SQL 语句成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.cc('发布闲置失败！')

      //拿到添加后返回的id
      const gId = results.insertId
      const imgs = []
      for (let i = 0; i < goodsImages.length; i++) {
         imgs.push([gId, goodsImages[i]])
      }
      //将图片都插入到 图片表中
      const sql2 = `insert into image(goods_id,img_url) values ?`
      db.query(sql2,[imgs], (err, results) => {
         if (err) return res.cc(err)
          // 发布文章成功
         if(results) res.cc('发布闲置成功', 0)
      })
     
   })
}

//根据id查询详情
exports.detail = (req, res) => {
   let goodId = req.params.id

   const sql = `select * from goods where id = ? and status = 1`
}