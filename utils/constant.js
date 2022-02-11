const { env } = require('./env')
const UPLOAD_PATH = env === 'dev' ? 'E:/Nginx/upload/dev' : 'E:/Nginx/upload/prod'
const UPLOAD_URL = env === 'dev' ? 'http://book.youbaobao.test' : 'http://book.youbaobao.test'
module.exports = {
    CODE_ERROR: -1,
    CODE_SUCCESS: 0,
    CODE_TOKEN_EXPIRED: -2,
    debug: false,
    PWD_SALT: 'my-imooc-read',
    PRIVATE_KEY: 'my_imooc_admin_read_program',
    JWT_EXPIRED: 60 * 60, //单位为秒,
    MIME_TYPE_EPUB: 'application/epub',
    UPLOAD_PATH,
    UPLOAD_URL
}