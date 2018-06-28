var express = require('express');
var router = express.Router();

router.post( '/test', function (req, res, next) {
    res.end( JSON.stringify({
        test: '测试数据, 测试服务器和客户端的通信'
    }) )
} )

router.post( '/article/posts', function (req, res, next) {
    console.log( req ) ;
    res.end( JSON.stringify({
        test: '测试数据, 测试服务器和客户端的通信'
    }) )
} )

module.exports = router;
