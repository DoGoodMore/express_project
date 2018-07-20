const needTokenList = require( '../list/tokenRequestList' ).needTokenRequest ;
const mongodbMode = require( '../util/mongodb-model' ) ;
const resHandles = require( '../util/auth' ) ;
const jwt = require( 'jsonwebtoken' ) ;
const config = require( '../config' ) ;

module.exports = function (req, res, next) {
    const path = req[ `_parsedUrl` ].path ;
    if (
        !needTokenList.find( item => {
            if ( item === path ) {
                const { token } = req.body ;
                mongodbMode.userModel.findOne( { token }, ( err, user ) => {
                    if ( err ) return res.json( resHandles.createError( `SR-003`, `数据库读取错误` ) ) ;
                    if ( !err && user ) {
                        const newToken = jwt.sign( {}, config.secret, {} ) ;
                        user.token = newToken ;
                        user.save( (err) => {
                            if ( err ) return res.json( resHandles.createError( `SR-006`, `数据库更新失败` ) ) ;
                            req.token = newToken ;
                            next() ;
                        } )
                    } else {
                        return res.json( { status: 3, message: '无效的token值' } ) ;
                    }
                } ) ;
                return true
            }
        } )
    ) next() ;
} ;