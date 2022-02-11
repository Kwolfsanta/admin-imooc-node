const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const {PRIVATE_KEY} = require('./constant')


function md5(s) {
    // 参数必须为string类型否则会出错
    return crypto.createHash('md5').update(String(s)).digest('hex')
}

function decodeJwt(req) {
    const authorization = req.get('Authorization');
    console.log(authorization);
    let token = '';
    if(authorization.indexOf('Bearer') >= 0) {
        token = authorization.replace('Bearer ', '');
    } else {
        token = authorization;
    }
    return jwt.verify(token, PRIVATE_KEY);
}

module.exports = {
    md5,
    decodeJwt
}