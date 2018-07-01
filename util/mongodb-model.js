const mongoose = require( './mongodb' ) ;

const Schema  = mongoose.Schema ;

//文章数据库Mode
const articleSchema = new Schema( {
    title: String, //文章标题
    author: String, //文章作者
    content: String, //文章内容
    create: { type: Date, default: Date.now() }, //文章内容创建时间
    update: { type: Date, default: Date.now() }, //最近更新时间
    comments: [
        {
            username: String, //评论用户
            date: Date, //评论日期
            content: String //评论内容
        }
    ], //评论列表
    description: String, //文章描述
    good: Number, //点赞数
    noGood: Number, //踩数
    original: Boolean, //是否原创
    from: {
        author: String, //来源作者
        fromUrl: String //来源url
    }, //来源对象
    poster: String //封面图片地址
}, { autoIndex: true } ) ;

//标签数据库Model
const tagSchema = new Schema( {
    label: String, //标签的显示文字
    value: Number, //查询
    create: { type: Date, default: Date.now() }, //创建时间
    update: { type: Date, default: Date.now() }, //最近更新时间
    background: String, //背景颜色
    color: String //文字颜色
}, { autoIndex: true } ) ;

const articleModel = mongoose.model( 'article', articleSchema ) ;
const tagModel = mongoose.model( 'tag', tagSchema ) ;

module.exports = {
    articleModel,
    tagModel
} ;

