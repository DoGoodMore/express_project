var express = require('express');
var router = express.Router();
var handle = require( '../util/handle' ) ;
const permission = require( '../middleware/permission' ) ;

//对请求进行权限拦截
router.use( '*', permission ) ;

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

//删除对应文章
router.post( '/article/delArticle', handle.delArticle ) ;

//更新当前文章是否为热门
router.post( '/article/updateArticleHot', handle.updateArticleHot ) ;

//获取所有热门文章
router.post( '/article/getHotArticles', handle.getHotArticles ) ;

//获取网站公告置顶信息
router.post( '/common/getFileInfo', handle.getFileInfo ) ;

//修改网站的公告内容
router.post( '/common/changePostFile', handle.changePostFile ) ;

//修改网站的置顶内容
router.post( '/common/changeToppingFile', handle.changeToppingFile ) ;

//获取文章详情
router.post( '/article/getArticleDetail', handle.getArticleDetail ) ;

//获取相似文章列表
router.post( '/article/getLikeArticles', handle.getLikeArticles ) ;

//根据ID获取某个文章
router.post( '/article/getArticleById', handle.getArticleById ) ;

//更新文章内容
router.post( '/article/update', handle.updateArticle ) ;

//新增文章类别的接口
router.post( '/types/addTypes', handle.addNewType ) ;

//获取类别接口分页数据
router.post( '/types/getTypeListPage', handle.getTypeListPage ) ;

//获取所有的一级类别的列表
router.post( '/types/getFirstTypeList', handle.getFirstTypeList ) ;

//删除类别
router.post( '/types/delType', handle.delType ) ;

//获取所有类别接口
router.post( '/types/getAllTypeList', handle.getAllTypeList ) ;

//更新类别信息
router.post( '/types/updateType', handle.updateType ) ;

//根据文章类型获取对应的文章列表
router.post( '/article/getArticleListByType', handle.getArticleListByType ) ;

//发送消息接口
router.post( '/message/sendMessage', handle.sendMessage ) ;

//获取消息列表的分页数据
router.post( '/message/getMessagePage', handle.getMessagePage ) ;

//删除对应消息的接口
router.post( '/message/deleteMessage', handle.deleteMessage ) ;

//将对应消息标记为已读状态的接口
router.post( '/message/lookMessage', handle.lookMessage ) ;

//注册用户的接口
router.post( '/users/registerUser', handle.registerUser ) ;

//用户登录接口
router.post( '/users/loginByUsername', handle.loginByUsername ) ;

//用户新增待办事项接口
router.post( '/todos/addTodo', handle.addTodo ) ;

//获取待办事项的分页接口
router.post( '/todos/getTodosPage', handle.getTodosPage ) ;

//完成指定事项的接口
router.post( '/todos/finishTodo', handle.finishTodo ) ;

//删除指定待办事项接口
router.post( '/todos/deleteTodo', handle.deleteTodo ) ;

//更新待办事项
router.post( '/todos/updateTodo', handle.updateTodo ) ;

//为文章点赞
router.post( '/article/likeArticle', handle.likeArticle ) ;

//为文章点踩
router.post( '/article/notLikeArticle', handle.notLikeArticle ) ;

module.exports = router ;
