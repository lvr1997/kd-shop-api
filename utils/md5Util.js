const crypto = require('crypto')
const SECRET_KEY = 'abc!@#123'

function md5(password) {
    let md5 = crypto.createHash('md5')
    return md5.update(password).digest('hex')
}

// 加密函数
function getPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}
 
module.exports = {
    getPassword
}