var express = require('express');
var router = express.Router();
var handle = require( '../util/handle' ) ;


router.post( '/test', function (req, res, next) {
    res.end( JSON.stringify({
        test: '测试数据, 测试服务器和客户端的通信'
    }) )
} )


//处理添加文章上传新的图片
router.post( '/article/posts', handle.articlePosts ) ;

//处理添加文章上传新的图片
router.post( '/article/add', handle.articleAdd ) ;

module.exports = router ;
