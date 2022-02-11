const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// 注意，下面这行代码必须写到bodyParser的两行app.use的代码下面，否则的话仍然无法解析
app.use('/', router);
// function errorHandler(err, req, res, next) {
//     console.log(err);
//     res.status(400).json({
//         error: '??',
//         msg: err.toString()
//     })
// }

// app.use(errorHandler);
const server = app.listen(5000, function () {
    const {address, port} = server.address();
    console.log('Http server is running on http://%s:%s', address, port);
})

