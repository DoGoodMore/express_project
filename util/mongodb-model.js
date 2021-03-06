const mongoose = require( './mongodb' ) ;
const bcrypt = require( 'bcrypt' ) ;


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
    good: [
        {
            ip: String, //点赞人的IP地址
            time: Date //点赞时间
        }
    ], //点赞数
    noGood: [
        {
            ip: String, //下踩人的IP地址
            time: Date //下踩时间
        }
    ], //踩数
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

//用户列表 数据库Model
const UserSchema = new Schema( {
    username: { //用户名
        type: String,
        unique: true, //不可重复约束
        require: true
    },
    password: { //用户密码
        type: String,
        require: true
    },
    token: { //用户唯一标识的字串
        type: String
    },
    create: { //用户创建时间
        type: Date,
        default: Date.now()
    }
} ) ;

//用户待办事项列表 数据库Model
const TodoSchema = new Schema( {
    todoTitle: String, //待办事项的标题
    todoType: '',//待办事项的类型(用户输入)
    finishDate: '',//待办事项的计划完成时间( 用户传入 )
    content: '',//待办事项的具体内容( 用户传入 )
    create: {//待办事项的创建时间 服务器生成
        type: Date,
        default: Date.now()
    },
    completeDate: Date,//待办事项的完成日期
    isFinish: { //是否完成当前事项
        type: Boolean,
        default: false
    }
} ) ;

//对用户保存的密码进行加密处理 确保用户的密码只有用户自己知道
UserSchema.pre( 'save', function ( next ) {
    const user = this ;
    if ( this.isModified( 'password' ) || this.isNew ) {
        bcrypt.genSalt( 10, function (err, salt) {
            if ( err ) return next( err ) ;
            bcrypt.hash( user.password, salt, function (err, hash) {
                if ( err ) return next( err ) ;
                user.password = hash ;
                next() ;
            } )
        } )
    } else {
        return next() ;
    }
} ) ;

//对用户输入的密码进行匹配 查看输入的密码是否正确
UserSchema.methods.comparePassword = function (pwd, cb) {
    bcrypt.compare( pwd, this.password, ( err, isMatch ) => {
        if ( err ) return cb( err ) ;
        cb( null, isMatch )
    } )
} ;
//进行用户完成对应的待办事项的调用事件 记录完成时间完成状态等
TodoSchema.methods.completeTodo = function (cb) {
    this.isFinish = true ;
    this.completeDate = Date.now() ;
    this.save( (err) => {
        if ( err ) return cb( err ) ;
        cb( null ) ;
    } )
} ;

const articleModel = mongoose.model( 'article', articleSchema ) ;

const tagModel = mongoose.model( 'tag', tagSchema ) ;

const typeModel = mongoose.model( 'type', typeSchema ) ;

const messageModel = mongoose.model( 'message', MessageSchema ) ;

const userModel = mongoose.model( 'user', UserSchema ) ;

const todoModel = mongoose.model( 'todo', TodoSchema ) ;

module.exports = {
    articleModel,
    tagModel,
    typeModel,
    messageModel,
    userModel,
    todoModel
} ;

