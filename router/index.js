const express = require('express');
const boom  = require('boom');
const userRouter = require('./user');
const bookRouter = require('./book')
const {
    CODE_ERROR, CODE_TOKEN_EXPIRED
} = require('../utils/constant');
const jwtAuth = require('./jwt');

// 注册路由
const router = express.Router();

// 对所有路由进行Jwt验证
router.use(jwtAuth);
router.get('/', function (req, res) {
    res.send('欢迎来到后台');
})

router.use('/user', userRouter);
router.use('/book', bookRouter);
/**
 * 集中处理404请求的中间件
 * 注意：该中间件必须放在正常处理流程之后
 * 否则，会拦截正常请求
 */
router.use((req, res, next) => {
    next(boom.notFound('接口不存在'))
  })
  /**
 * 自定义路由异常处理中间件
 * 注意两点：
 * 第一，方法的参数不能减少
 * 第二，方法的必须放在路由最后
 */
router.use((err, req, res, next) => {
    const msg = (err && err.message) || '系统错误'
    if(err?.name === 'UnauthorizedError') {
    const statusCode = 402;
    const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message
    console.log(err);
      res.status(statusCode).json({
        code: CODE_TOKEN_EXPIRED,
        msg,
        error: statusCode,
        errorMsg
      })
  } else {
    const statusCode = (err.output && err.output.statusCode) || 500;
    const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message
    res.status(statusCode).json({
      code: CODE_ERROR,
      msg,
      error: statusCode,
      errorMsg
    })
  }

  })
module.exports = router;