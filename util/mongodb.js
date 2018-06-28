const mongoose = require( 'mongoose' ) ;
const settings = require( './settings' ) ;

const url = `mongodb://${settings.ip}/${settings.db}` ;

mongoose.connect( url ) ;

const db = mongoose.connection ;

db.on( 'error', console.error.bind( console, '数据库连接错误 ...' ) ) ;

db.on( 'connected', () => console.log( `数据库已成功连接到${url}` ) ) ;

module.exports = mongoose ;