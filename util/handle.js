const handles = module.exports ;

const fs = require( 'fs' ) ;
const serviceInfo = require( '../util/service_settings' ) ;
const resHandler = require( './auth' ) ;
const mongodbMode = require( './mongodb-model' ) ;
const countJs = require( '../count/count' ) ;


handles.articleAdd = function ( req, res ) {
    const data = req.body.data ;
    let imgUrl = '' ;
    if ( data[ 'imgFile' ] ) {
        const dataBuffer = new Buffer( data[ 'imgFile' ], 'base64' ) ;
        let imgName = `${Date.now()}.${data[ 'fileType' ].split( '/' )[ 1 ]}` ;
        imgUrl = `${serviceInfo.ip}:${serviceInfo.port}/images/articles_img/${imgName}` ;
        fs.writeFile(`../public/images/articles_img/${imgName}`, dataBuffer, function(err) {
            if ( err ) res.json( resHandler.createError( 'SR-002', '图片存储错误' ) )
        }) ;
    }
    new mongodbMode.articleModel( {
        title: data[ 'title' ],
        author: data[ 'author' ],
        content: data[ 'content' ],
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