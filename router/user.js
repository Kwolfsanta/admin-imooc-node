const express = require('express')
const Result = require('../models/Result')
const { login, register, validateUser, findUser } = require('../services/user')
const { body, validationResult } = require('express-validator')
const { PRIVATE_KEY, JWT_EXPIRED } = require('../utils/constant')
const { decodeJwt } = require('../utils')
const jwt = require('jsonwebtoken')
const boom = require('boom')

const router = express.Router()

router.get('/info', function(req, res, next) {
  // let username = decodeJwt(req.data.token);
  // findUser(username).then(res => console.log(res));
  // console.log('user/info', req.headers);
    let decoded = decodeJwt(req);
    let username;
    console.log(decoded);
  if(decoded && decoded.username) {
    findUser(decoded.username).then(user => {
      if(!user || user.length == 0) {
        new Result('用户不存在').fail(res)
      } else {
        const {username, avatar, role} = user;
        const newUser = {username, avatar, 'roles': [role]};
        new Result(newUser, '获取用户信息成功').success(res)
      }
    })
  } else {
    new Result('用户信息解析失败').fail(res)
  }
  // res.json('user info...')
})

router.post('/login', 
[
  body('username').isString().withMessage('username类型需为String'), // isString()为该body的内置方法，判断数字的方法为isNumeric()
  body('password').isString().withMessage('password类型需为String')
],
  function(req, res, next) {
    // console.log('/user/login', req.body)
    const err = validationResult(req)
    console.log(err)
    if(!err.isEmpty()){
      // 解构语法简单获取msg
      const [{ msg }] = err.errors;
      // 移交给中间件处理
      next(boom.badRequest(msg))
    } else {
      let { username, password } = req.body
      login(username, password)
      .then(user => {
        if(!user || user.length == 0){
          new Result('用户名或密码不存在').fail(res)
        } else {
          const token = jwt.sign(
            {username},
            PRIVATE_KEY,
            { expiresIn: JWT_EXPIRED }
          )
          new Result({ token }, '登录成功').success(res)
        }
      })
    }
  })

router.post('/register', function (req, res, next) {
  console.log('/user/register', req.body);
  let { username, password } = req.body;
  validateUser(username).then(user => {
    // 用户不存在时进行注册
    if(!user || user.length == 0) {
      register(username, password).then(result => {
        console.log(result)
        new Result('注册成功').success(res)
      })
    } else{
        new Result('该用户已存在').fail(res)
    }
  })
})
module.exports = router