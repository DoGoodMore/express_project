const handles = module.exports ;

const fs = require( 'fs' ) ;
const serviceInfo = require( '../util/service_settings' ) ;
const resHandler = require( './auth' ) ;
const mongodbMode = require( './mongodb-model' ) ;
const countJs = require( '../count/count' ) ;
const fileInfo = require( '../count/fileInfo' ) ;
const tools = require( './tools' ) ;
const path = require( 'path' ) ;
const jwt = require( 'jsonwebtoken' ) ;
const config = require( '../config' ) ;
//todo : 没有对参数进行判定验证 进格式和是否传入进行验证

handles.articleAdd = function ( req, res ) {
    const data = req.body.data ;
    let imgUrl = '' ;
    if ( data[ 'imgFile' ] ) {
        const dataBuffer = new Buffer( data[ 'imgFile' ], 'base64' ) ;
        let imgName = `${Date.now()}.${data[ 'fileType' ].split( '/' )[ 1 ]}` ;
        imgUrl = `http://${serviceInfo.ip}:${serviceInfo.port}/images/articles_img/${imgName}` ;
        fs.writeFile( path.resolve( __dirname, `../public/images/articles_img/${ imgName }` ), dataBuffer, function(err) {
            if ( err ) res.json( resHandler.createError( 'SR-002', '图片存储错误' ) )
        }) ;
    }
    new mongodbMode.articleModel( {
        title: data[ 'title' ],
        author: data[ 'author' ],
        content: data[ 'content' ],
        tags: data[ 'tags' ],
        create: Date.now(),
        update: Date.now(),
        comments: [],
        description:  data[ 'description' ],
        good: 0,
        type: data[ `articleType` ],
        noGood: 0,
        original: data.original,
        from: {
            author: data.original ? '' : data.from.author,
            fromUrl: data.original ? '' : data.from.fromUrl
},
        views: 0,
        poster: imgUrl
    } ).save( function ( err ) {
        if ( err ) res.json( resHandler.createError( 'SR-003', '数据库存入错误' ) ) ;
        res.json( resHandler.sendSuccess() )
    } )
} ;

handles.addNewTag = function ( req, res ) {
    const data = req.body.data ;
    new mongodbMode.tagModel( {
        label: data.label,
        value: countJs.tagCount,
        create: Date.now(),
        update: Date.now(),
        background: data.background,
        color: data.color
    } ).save( function (err) {
        if ( err ) res.json( resHandler.createError( 'SR-003', '数据库存入错误' ) ) ;
        countJs.tagCount ++ ;
        fs.writeFile( path.resolve( __dirname, '../count/count.json' ), JSON.stringify( countJs ), function (err) {
            if ( err ) return console.log( err ) ;
            res.json( resHandler.sendSuccess() ) ;
        }) ;
    } )
} ;

handles.getTagList = function (req, res) {
    const data = req.body.data ;
    const { pageNum, pageSize } = data ;
    mongodbMode.tagModel.find( {} )
        .skip( ( pageNum - 1 ) * pageSize )
        .limit( pageSize )
        .sort( { _id: -1 } )
        .exec( function (err, result) {
            if ( err ) res.json( resHandler.createError( 'SR-004', '数据库读取错误' ) ) ;
            mongodbMode.tagModel.count( {}, function (err, count) {
                if ( err ) res.json( resHandler.createError( 'SR-004', '数据库读取错误' ) ) ;
                res.json( { status: 0, data: result, total: count } ) ;
            } )
        } )
} ;

handles.updateTag = function (req, res) {
    const data = req.body.data ;
    mongodbMode.tagModel.updateOne( { _id: data._id },
        { label: data.label, color: data.color, background: data.background, update: Date.now() },
        function ( err ) {
            if ( err ) res.json( resHandler.createError( 'SR-006', '数据库更新错误' ) ) ;
            res.json( resHandler.sendSuccess() ) ;
        })
} ;

handles.delTag = function (req, res) {
    const data = req.body.data ;
    mongodbMode.tagModel.remove( { _id: data._id }, function (err) {
        if ( err ) res.json( resHandler.createError( 'SR-007', '数据库删除错误' ) ) ;
        res.json( resHandler.sendSuccess() ) ;
    } )
} ;

handles.getAllTags = function (req, res) {
    mongodbMode.tagModel.find( {}, function (err, result) {
        if ( err ) res.json( resHandler.createError( 'SR-003', '数据库读取错误' ) ) ;
        res.json( { status: 0, data: result } ) ;
    } )
} ;

handles.updateHotTags = function (req, res) {
    const data = req.body.data ;
    mongodbMode.tagModel.updateOne( { _id: data._id }, { hot: data.hot }, function (err) {
        if ( err ) res.json( resHandler.createError( `SR-006`, `数据库更新错误` ) ) ;
        res.json( resHandler.sendSuccess() ) ;
    } )
} ;

handles.getHotTags = function (req, res) {
    mongodbMode.tagModel.find( { hot: true }, { _id: 0, label: 1, value: 1, background: 1, color: 1 }, function (err, result) {
        if ( err ) res.json( resHandler.createError( `SR-003`, `数据库读取错误` ) ) ;
        res.json( { status: 0, data: result } )
    } )
} ;

handles.getArticleListPage = function (req, res) {
    const data = req.body.data ;
    const { pageNum, pageSize } = data ;
    mongodbMode.articleModel.find( {}, { content: 0, from: 0, original: 0 } )
        .sort( { _id: -1 } )
        .skip( ( pageNum - 1 ) * pageSize )
        .limit( pageSize )
        .exec( function (err, result) {
            if ( err ) res.json( resHandler.createError( 'SR-004', '数据库读取错误' ) ) ;
            mongodbMode.articleModel.count( {}, function (err, count) {
                if ( err ) res.json( resHandler.createError( 'SR-004', '数据库读取错误' ) ) ;
                res.json( { status: 0, data: result, total: count } ) ;
            } )
        } )
} ;

handles.delArticle = function (req, res) {
    const data = req.body.data ;
    mongodbMode.articleModel.remove( { _id: data._id }, function (err) {
        if ( err ) res.json( resHandler.createError( 'SR-007', '数据库删除错误' ) ) ;
        res.json( resHandler.sendSuccess() ) ;
    } ) ;
} ;

handles.updateArticleHot = function (req, res) {
    const data = req.body.data ;
    mongodbMode.articleModel.updateOne( { _id: data._id }, { hot: data.hot }, function (err) {
        if ( err ) res.json( resHandler.createError( `SR-006`, `数据库更新错误` ) ) ;
        res.json( resHandler.sendSuccess() ) ;
    } )
} ;

handles.getHotArticles = function (req, res) {
    mongodbMode.articleModel.find( { hot: true }, { title: 1 }, function (err, result) {
        if ( err ) res.json( resHandler.createError( `SR-003`, `数据库读取错误` ) ) ;
        res.json( { status: 0, data: result } ) ;
    } )
} ;

handles.getFileInfo = function (req, res) {
    res.json( { status: 0, data: fileInfo } ) ;
} ;

handles.changePostFile = function (req, res) {
    const data = req.body.data ;
    fileInfo.post = data.post ;
    fs.writeFile( path.resolve( __dirname, '../count/fileInfo.json' ), JSON.stringify( fileInfo ), function (err) {
        if ( err ) return console.log( err ) ;
        res.json( resHandler.sendSuccess() ) ;
    }) ;
} ;

handles.changeToppingFile = function (req, res) {
    const data = req.body.data ;
    fileInfo.topping = data.topping ;
    fs.writeFile( path.resolve( __dirname, '../count/fileInfo.json' ), JSON.stringify( fileInfo ), function (err) {
        if ( err ) return console.log( err ) ;
        res.json( resHandler.sendSuccess() ) ;
    }) ;
} ;

handles.getArticleDetail = function (req, res) {
    const data = req.body.data ;
    mongodbMode.articleModel.find( { _id: data.id }, function (err, result) {
        if ( err ) res.json( resHandler.createError( `SR-003`, `数据库读取错误` ) ) ;
        //todo : 待优化
        mongodbMode.articleModel.find( {}, { title: 1 }, function (err, allArray) {
            if ( err ) res.json( resHandler.createError( `SR-003`, `数据库读取错误` ) ) ;
            let pre = null, next = null ;
            if ( allArray && allArray.length ) {
                allArray.forEach( function (item, index) {
                    if ( ( item._id + '' ) === data.id ) {
                        pre = allArray[ index - 1 ] ? allArray[ index - 1 ] : null ;
                        next = allArray[ index + 1 ] ? allArray[ index + 1 ] : null ;
                    }
                } )
            }
            res.json( { status: 0, data: result[ 0 ], pre: pre, next: next } ) ;
        } ) ;

    } )
} ;

handles.getLikeArticles = function (req, res) {
    const data = req.body.data ;
    mongodbMode.articleModel.find( { tags: data.tags }, { title: 1 }, function (err, result) {
        if ( err ) res.json( resHandler.createError( `SR-003`, `数据库读取错误` ) ) ;
        if ( result && result.length ) {
            result.find( function (item, index) {
                if ( ( item._id + '' ) === data.id ) {
                    result.splice( index, 1 ) ;
                    return true ;
                }
            } )
        }
        res.json( { status: 0, data: result } ) ;
    } )
} ;

handles.getArticleById = function (req, res) {
    const data = req.body.data ;
    mongodbMode.articleModel.findOne( { _id: data.id }, function (err, result) {
        if ( err ) res.json( resHandler.createError( `SR-003`, `数据库读取错误` ) ) ;
        res.json( { status: 0, data: result } ) ;
    } )
} ;

handles.updateArticle = function (req, res) {
    const data = req.body.data ;
    if ( data[ `imgFile` ] ) {
        mongodbMode.articleModel.findOne( { _id: data._id }, { poster: 1, _id: 0 }, function (err, result) {
            if ( err ) res.json( resHandler.createError( `SR-003`, `数据库读取错误` ) ) ;
            if ( result[ `poster` ] ) {
                const imgUrl = result[ `poster` ].replace( `http://${serviceInfo.ip}:${serviceInfo.port}`, `` ) ;
                fs.unlink( `../public${imgUrl}`, function (err) {
                    if ( err ) res.json( resHandler.createError( `SR-008`, `本地文件删除错误` ) ) ;
                    let imgUrl = '' ;
                    if ( data[ 'imgFile' ] ) {
                        const dataBuffer = new Buffer( data[ 'imgFile' ], 'base64' ) ;
                        let imgName = `${Date.now()}.${data[ 'fileType' ].split( '/' )[ 1 ]}` ;
                        imgUrl = `http://${serviceInfo.ip}:${serviceInfo.port}/images/articles_img/${imgName}` ;
                        fs.writeFile( path.resolve( __dirname, `../public/images/articles_img/${imgName}` ), dataBuffer, function(err) {
                            if ( err ) res.json( resHandler.createError( 'SR-002', '图片存储错误' ) ) ;
                            mongodbMode.articleModel.update( { _id: data._id }, {
                                title: data.title,
                                author: data.author || 'xyzzzzz',
                                content: data.content,
                                update: Date.now(),
                                description: data.description,
                                tags: data.tags,
                                original: data.original,
                                from: {
                                    author: data.original ? '' : data.from.author,
                                    fromUrl: data.original ? '' : data.from.fromUrl
                                },
                                poster: imgUrl
                            }, function (err) {
                                if ( err ) res.json( resHandler.createError( `SR-003`, `数据库读取错误` ) ) ;
                                res.json( resHandler.sendSuccess() ) ;
                            } )
                        }) ;
                    }
                } )
            }
        } ) ;
    } else {
        mongodbMode.articleModel.update( { _id: data._id }, {
            title: data.title,
            author: data.author || 'xyzzzzz',
            content: data.content,
            update: Date.now(),
            description: data.description,
            tags: data.tags,
            original: data.original,
            from: {
                author: data.original ? '' : data.from.author,
                fromUrl: data.original ? '' : data.from.fromUrl
            }
        }, function (err) {
            if ( err ) res.json( resHandler.createError( `SR-003`, `数据库读取错误` ) ) ;
            res.json( resHandler.sendSuccess() ) ;
        } )
    }
} ;

handles.addNewType = function (req, res) {
    const { typeName, typeLevel, typePath, upperType, typeSort } = req.body.data ;
    new mongodbMode.typeModel( {
        typeName,
        typeLevel,
        upperType: typeLevel === 1 ? 1 : upperType,
        typePath,
        typeSort: typeLevel === 1 ? ( typeSort ? typeSort : 0 ) : 0,
        value: countJs.typeCount,
    } ).save( function (err) {
        if ( err ) res.json( resHandler.createError( 'SR-003', '数据库存入错误' ) ) ;
        countJs.typeCount ++ ;
        fs.writeFile( path.resolve( __dirname, '../count/count.json' ), JSON.stringify( countJs ), function (err) {
            if ( err ) return console.log( err ) ;
            res.json( resHandler.sendSuccess() ) ;
        }) ;
    } ) ;
} ;

handles.getTypeListPage = function (req, res) {
    const data = req.body.data ;
    const { pageNum, pageSize } = data ;
    mongodbMode.typeModel.find( {} )
        .sort( { _id: -1 } )
        .skip( ( pageNum - 1 ) * pageSize )
        .limit( pageSize )
        .exec( function (err, result) {
            if ( err ) res.json( resHandler.createError( 'SR-004', '数据库读取错误' ) ) ;
            mongodbMode.typeModel.count( {}, function (err, count) {
                if ( err ) res.json( resHandler.createError( 'SR-004', '数据库读取错误' ) ) ;
                res.json( { status: 0, data: result, total: count } ) ;
            } )
        } )
} ;

handles.getFirstTypeList = function (req, res) {
    mongodbMode.typeModel.find( { upperType: 1 }, function (err, result) {
        if ( err ) res.json( resHandler.createError( `SR-004`, `数据库读取错误` ) ) ;
        res.json( { status: 0, data: result } ) ;
    } )
} ;

handles.delType = function (req, res) {
    const data = req.body.data ;
    mongodbMode.typeModel.remove( { _id: data.id }, function (err) {
        if ( err ) res.json( resHandler.createError( `SR-007`, `数据库删除失败` ) ) ;
        res.json( resHandler.sendSuccess() ) ;
    } )
} ;

handles.getAllTypeList = function (req, res) {
    mongodbMode.typeModel.find( {}, function (err, result) {
        if ( err ) res.json( resHandler.createError( `SR-003`, `数据库读取错误` ) ) ;
        res.json( { status: 0, data: result } ) ;
    } )
} ;

handles.updateType = function (req, res) {
    const data = req.body.data ;
    const { typeLevel, typeName, typePath, typeSort, upperType } = data ;
    mongodbMode.typeModel.update( { _id: data._id }, {
        typeLevel, typeName, typePath,
        upperType: typeLevel === 1 ? 1 : upperType,
        typeSort: typeLevel === 1 ? ( typeSort ? typeSort : 0 ) : 0
    }, function (err) {
        if ( err ) res.json( resHandler.createError( `SR-004`, `数据库存储错误` ) ) ;
        res.json( resHandler.sendSuccess() ) ;
    } )
} ;

handles.getArticleListByType = function (req, res) {
    const { pageNum, pageSize, articlePath } = req.body.data ;
    const queryObject = articlePath === 'all' ? {} : { type: articlePath } ;
    mongodbMode.articleModel.find( queryObject, { content: 0, from: 0, original: 0 } )
        .sort( { _id: -1 } )
        .skip( ( pageNum - 1 ) * pageSize )
        .limit( pageSize )
        .exec( function (err, result) {
            if ( err ) res.json( resHandler.createError( 'SR-004', '数据库读取错误' ) ) ;
            res.json( { status: 0, data: result } ) ;
        } )
} ;

handles.sendMessage = function (req, res) {
    const data = req.body.data ;
    //todo : 进行存入操作的验证比如是否为空 是否符合规则等
    new mongodbMode.messageModel( {
        username: data.username,
        email: data.email,
        content: data.content
    } ).save( function (err) {
        if ( err ) res.json( resHandler.createError( `SR-004`, `数据库存储错误` ) ) ;
        res.json( resHandler.sendSuccess() ) ;
    } )
} ;

handles.getMessagePage = function (req, res) {
    const { pageNum, pageSize } = req.body.data ;
    mongodbMode.messageModel.find( {} )
        .sort( { _id: -1 } )
        .skip( ( pageNum - 1 ) * pageSize )
        .limit( pageSize )
        .exec( function (err, result) {
            if ( err ) res.json( resHandler.createError( 'SR-004', '数据库读取错误' ) ) ;
            mongodbMode.messageModel.count( {}, function (err, count) {
                if ( err ) res.json( resHandler.createError( 'SR-004', '数据库读取错误' ) ) ;
                res.json( { status: 0, data: result, total: count } ) ;
            } )
        } )
} ;

handles.deleteMessage = function (req, res) {
    const data = req.body.data ;
    if ( !data.id ) res.json( resHandler.createError( `SR-009`, `缺少id参数` ) ) ;
    mongodbMode.messageModel.remove( { _id: data.id }, function (err) {
        if ( err ) res.json( resHandler.createError( `SR-007`, `数据库删除错误` ) ) ;
        res.json( resHandler.sendSuccess() ) ;
    } )
} ;

handles.lookMessage = function (req, res) {
    const { id } = req.body.data ;
    if ( !id ) res.json( resHandler.createError( `SR-009`, `缺少必要的参数` ) ) ;
    mongodbMode.messageModel.update( { _id: id }, { isRead: true }, function (err) {
        if ( err ) res.json( resHandler.createError( `SR-006`, `数据库更新错误` ) ) ;
        res.json( resHandler.sendSuccess() ) ;
    } )
} ;

handles.registerUser = function (req, res) {
    const { username, password } = JSON.parse(req.body.data) ;
    if ( !username || !password ) {
        return res.json( resHandler.createError( `SR-009`, `缺少必要参数` ) ) ;
    }
    new mongodbMode.userModel( {
        username,
        password
    } ).save( function (err) {
        if ( err ) return res.json( resHandler.createError( `SR-004`, `数据库存储错误` ) ) ;
        res.json( resHandler.sendSuccess() ) ;
    } )
} ;

handles.loginByUsername = function (req, res) {
    const { username, password } = req.body.data ;
    mongodbMode.userModel.findOne( { username }, ( err, user ) => {
        if ( err ) return res.json( resHandler.createError( `SR-003`, `数据库读取错误` ) ) ;
        if ( !user ) {
            return res.json( { status: 2, message: '该用户不存在' } ) ;
        } else {
            //检测用户输入的密码是否正确
            user.comparePassword( password, ( err, isMatch ) => {
                if ( isMatch && !err ) {
                    const token = jwt.sign( {}, config.secret, {} ) ;
                    user.token = token ;
                    user.save( function (err) {
                        if ( err ) res.send( err ) ;
                        //todo : 登录之后返回消息列表等
                        res.json( { status: 0, message: '登录成功', token } ) ;
                    } )
                } else {
                    res.json( { status: 2, message: '用户名或密码错误' } ) ;
                }
            } )
        }
    } )
} ;

handles.addTodo = function (req, res) {
    const { todoTitle, todoType, finishDate, content } = req.body.data ;
    if ( !todoTitle || !todoType || !finishDate || !content ) return res.json( resHandler.createError( `SR-009`, `缺少必要参数` ) ) ;
    new mongodbMode.todoModel( {
        todoTitle,
        todoType,
        finishDate,
        content
    } ).save( function (err) {
        if ( err ) return res.json( resHandler.createError( `SR-004`, `数据库存储错误` ) ) ;
        res.json( resHandler.sendSuccess() ) ;
    } )
} ;

handles.getTodosPage = function (req, res) {
    const { isFinish, pageNum, pageSize } = req.body.data ;
    const query = isFinish ? { isFinish: true } : {} ;
    mongodbMode.todoModel.find( query )
        .sort( { _id: -1 } )
        .skip( ( pageNum - 1 ) * pageSize )
        .limit( pageSize )
        .exec( function (err, result) {
            if ( err ) return res.json( resHandler.createError( 'SR-004', '数据库读取错误' ) ) ;
            mongodbMode.todoModel.count( {}, function (err, count) {
                if ( err ) return res.json( resHandler.createError( 'SR-004', '数据库读取错误' ) ) ;
                res.json( { status: 0, data: result, total: count } ) ;
            } )
        } )
} ;

handles.finishTodo = function (req, res) {
    const { _id } = req.body.data ;
    mongodbMode.todoModel.findOne( { _id }, function (err, todo) {
        if ( err ) return res.json( resHandler.createError( `SR-003`, `数据库读取错误` ) ) ;
        todo.isFinish = true ;
        todo.save( function (err) {
            if ( err ) return res.json( resHandler.createError( `SR-004`, `数据库数据存储错误` ) ) ;
            res.json( resHandler.sendSuccess() ) ;
        } )
    } )
} ;

handles.deleteTodo = function (req, res) {
    const { _id } = req.body.data ;
    mongodbMode.todoModel.remove( { _id }, err => {
        if ( err ) return res.json( resHandler.createError( `SR-006`, `数据库操作失败` ) ) ;
        res.json( resHandler.sendSuccess() ) ;
    } )
} ;

handles.updateTodo = function (req, res) {
    const { todoTitle, todoType, finishDate, content, _id } = req.body.data ;
    if ( !todoTitle || !todoType || !finishDate || !content ) return res.json( resHandler.createError( `SR-009`, `缺少必要参数` ) ) ;
    mongodbMode.todoModel.updateOne( { _id }, { todoTitle, todoType, finishDate, content }, err => {
        if ( err ) return res.json( resHandler.createError( `SR-006`, `数据库更新错误` ) ) ;
        res.json( resHandler.sendSuccess() ) ;
    } )
} ;
