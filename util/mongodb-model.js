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
    type: String,
    description: String, //文章描述
    tags: Array, //文章标签
    good: Number, //点赞数
    noGood: Number, //踩数
    views: { type: Number, default: 0 },
    original: Boolean, //是否原创
    from: {
        author: String, //来源作者
        fromUrl: String //来源url
    }, //来源对象
    poster: String, //封面图片地址
    hot: { type: Boolean, default: false }//当前文章是否在热门中
}, { autoIndex: true } ) ;

//标签数据库Model
const tagSchema = new Schema( {
    label: String, //标签的显示文字
    value: Number, //查询
    create: { type: Date, default: Date.now() }, //创建时间
    update: { type: Date, default: Date.now() }, //最近更新时间
    background: String, //背景颜色
    color: String, //文字颜色
    hot: { type: Boolean, default: false } //当前标签是否是热门标签
}, { autoIndex: true } ) ;

//文章分类数据库Model
const typeSchema = new Schema( {
    typeName: String, //类别名称
    typeLevel: Number, //类别级别
    upperType: Number, //上级类别
    typePath: String, //类别路径
    value: Number, //value值
    typeSort: { type: Number, default: 0 },
    create: { type: Date, default: Date.now() } //创建时间
} ) ;

//消息列表数据库Model
const MessageSchema = new Schema( {
    username: String,//发送者的名称
    email: String,//发送者的电子邮箱
    sendTime: {//发送时间
        type: Date,
        default: Date.now()
    },
    isRead: { //是否已读
        type: Boolean,
        default: false
    },
    content: String//发送内容
} ) ;

const articleModel = mongoose.model( 'article', articleSchema ) ;

const tagModel = mongoose.model( 'tag', tagSchema ) ;

const typeModel = mongoose.model( 'type', typeSchema ) ;

const messageModel = mongoose.model( 'message', MessageSchema ) ;

module.exports = {
    articleModel,
    tagModel,
    typeModel,
    messageModel
} ;

