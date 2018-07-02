var express = require('express');
var router = express.Router();
var handle = require( '../util/handle' ) ;

//处理添加文章上传新的图片
router.post( '/article/add', handle.articleAdd ) ;

//处理添加标签列表
router.post( '/tags/addNewTag', handle.addNewTag ) ;

//获取标签列表
router.post( '/tags/getTagList', handle.getTagList ) ;

//更新标签信息
router.post( '/tags/updateTag', handle.updateTag ) ;

//删除当前标签
router.post( '/tags/delTag', handle.delTag ) ;

//获取所有的标签列表
router.post( '/tags/getAllTags', handle.getAllTags ) ;

//更新当前热门标签
router.post( '/tags/updateHotTags', handle.updateHotTags ) ;

//获取当前热门标签列表
router.post( '/tags/getHotTags', handle.getHotTags ) ;

//获取分页文章列表
router.post( '/article/getArticleListPage', handle.getArticleListPage ) ;

module.exports = router ;
