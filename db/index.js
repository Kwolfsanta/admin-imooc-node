const debug = require('../utils/constant')
const mysql = require('mysql')
const { host, user, password, database } = require('./config')

function connect() {
    return mysql.createConnection({
      host,
      user,
      password,
      database,
      multipleStatements: true
    })
  }

  function querySql(sql) {
    const conn = connect()
    debug && console.log(sql)
    return new Promise((resolve, reject) => {
      try {
        conn.query(sql, (err, results) => {
          if (err) {
            debug && console.log('查询失败，原因:' + JSON.stringify(err))
            reject(err)
          } else {
            debug && console.log('查询成功', JSON.stringify(results))
            resolve(results)
          }
        })
      } catch (e) {
        reject(e)
      } finally {
        conn.end()
      }
    })
  }

  function queryOne(sql) {
    return new Promise((resolve, reject) => {
      querySql(sql)
      .then(results => {
        if(results && results.length > 0) {
          console.log(results);
          resolve(results[0])
        } else {
          resolve(null)
        }
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }

  module.exports = {
      querySql,
      queryOne
  }