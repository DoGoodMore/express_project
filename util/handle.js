const handles = module.exports ;

const fs = require( 'fs' ) ;
const serviceInfo = require( '../util/service_settings' ) ;
const resHandler = require( './auth' ) ;
const mongodbMode = require( './mongodb-model' ) ;
const countJs = require( '../count/count' ) ;
const fileInfo = require( '../count/fileInfo' ) ;
const tools = require( './tools' ) ;

handles.articleAdd = function ( req, res ) {
    const data = req.body.data ;
    let imgUrl = '' ;
    if ( data[ 'imgFile' ] ) {
        const dataBuffer = new Buffer( data[ 'imgFile' ], 'base64' ) ;
        let imgName = `${Date.now()}.${data[ 'fileType' ].split( '/' )[ 1 ]}` ;
        imgUrl = `http://${serviceInfo.ip}:${serviceInfo.port}/images/articles_img/${imgName}` ;
        fs.writeFile(`../public/images/articles_img/${imgName}`, dataBuffer, function(err) {
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
        noGood: 0,
        original: data.original,
        from: {
            author: data.original ? data.from.author : '',
            fromUrl: data.original ? data.from.fromUrl : ''
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
        fs.writeFile('../count/count.json', JSON.stringify( countJs ), function (err) {
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
    mongodbMode.articleModel.find( { hot: true }, { _id: 0, title: 1 }, function (err, result) {
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
    fs.writeFile('../count/fileInfo.json', JSON.stringify( fileInfo ), function (err) {
        if ( err ) return console.log( err ) ;
        res.json( resHandler.sendSuccess() ) ;
    }) ;
} ;

handles.changeToppingFile = function (req, res) {
    const data = req.body.data ;
    fileInfo.topping = data.topping ;
    fs.writeFile('../count/fileInfo.json', JSON.stringify( fileInfo ), function (err) {
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
                        fs.writeFile( `../public/images/articles_img/${imgName}`, dataBuffer, function(err) {
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