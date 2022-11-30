const svgCaptcha = require('svg-captcha');

exports.getCaptcha = (req,resp) => {
    const captcha = svgCaptcha.create({
        inverse: false, // 翻转颜色
        fontSize: 48, // 字体大小
        noise: 2, // 干扰线条数
        width: req.query.width || 150, // 宽度
        height: req.query.height || 50, // 高度
        size: 4, // 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        color: true, // 验证码是否有彩色
        background: '#cccc66', // 验证码图片背景颜色
    })
    //保存到cookie,忽略大小写
    resp.cookie('captcha', captcha.text.toLowerCase())
    resp.type('image/svg+xml')
    resp.send(captcha.data)
}