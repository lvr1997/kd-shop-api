# kd-shop-api

## 注册

1. 检测表单数据是否合法
2. 检测用户名是否被占用
3. 对密码进行加密处理
4. 插入新用户

## 登录

1. 检测表单数据是否合法
2. 根据用户名查询用户的数据
3. 判断用户输入的密码是否正确
4. 生成 JWT 的 Token 字符串

## 验证码

1. 在登录和注册的时候为防止非法操作，在登录和注册过程中都需要输入图形验证码；
2. 使用svg-captcha插件生成图片验证码
3. 生成的图片验证码存储在cookie中

## 修改个人信息

对用户昵称、性别、个性签名、生日信息进行修改

## 修改密码

1. 检测旧密码是否正确
2. 校验新旧密码是否相同
3. 将新密码加密入库

## 修改头像

1. 传入base64格式的图片数据流
2. 更新数据库头像字段信息