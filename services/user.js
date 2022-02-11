 const { querySql, queryOne }  = require('../db')
const { PWD_SALT } = require('../utils/constant')
const { md5 } = require('../utils')

function refreshToken() {
  
}

function login(username, password) {
    password = md5(`${password}${PWD_SALT}`)
    console.log(password);
    const sql = `select * from admin_user where username='${username}' and password='${password}'`
    return querySql(sql)
}
function validateUser(username) {
    const sql = `select * from admin_user where username='${username}'`
    return querySql(sql)
}
function register(username, password) {
    password = md5(`${password}${PWD_SALT}`)
    console.log(password);
    const registerSql = `INSERT INTO admin_user (username, password) VALUES('${username}', '${password}')`;
    return querySql(registerSql);
}
function findUser(username) {
    const sql = `SELECT * FROM admin_user WHERE username='${username}'`;
    return queryOne(sql);
}
//   const sql = `select * from admin_user`

module.exports = {
    login,
    register,
    validateUser,
    findUser
}
