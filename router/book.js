const express = require('express')
const multer = require('multer')
const { UPLOAD_PATH } = require('../utils/constant')
const Result = require('../models/Result')
const { Book } = require('../models/Book')
const boom = require('boom')

const router = express.Router()

router.post(
  '/upload',
  multer({ dest: `${UPLOAD_PATH}/book` }).single('file'),
  function (req, res, next) {
    console.log(req.file);
    if(!req.file || req.file.length == 0) {
      new Result('上传文件不能为空').fail(res)
    } else {
      const book = new Book(req.file)
      console.log(book)
      book.parse()
        .then(book => {
          console.log(book)
          new Result('上传成功').success(res)
        })
        .catch(err => {
          console.log(err)
          next(boom.badImplementation(err))
        })
    }
  }
)
module.exports = router
