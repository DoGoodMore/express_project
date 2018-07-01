var express = require('express');
var router = express.Router();
var handle = require( '../util/handle' ) ;

//处理添加文章上传新的图片
router.post( '/article/add', handle.articleAdd ) ;

//处理添加标签列表
router.post( '/tags/addNewTag', handle.addNewTag ) ;

//获取标签列表
router.post( '/tags/getTagList', handle.getTagList ) ;

module.exports = router ;
