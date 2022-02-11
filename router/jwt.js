const expressJwt = require('express-jwt')
const { PRIVATE_KEY } = require('../utils/constant')

const jwtAuth = expressJwt({
    secret: PRIVATE_KEY,
    credentialsRequired: true,
    algorithms: ['HS256']
}).unless({
    path: [
        '/',
        '/user/login'
    ]
})

module.exports = jwtAuth