const handlers = module.exports ;

//返回错误信息的生成函数
//03 数据库读取错误
//04 数据库存储错误
//06 数据库更新错误
//07 数据库删除错误
//08 本地文件删除错误
handlers.createError = function ( errorObject, errorMessage ) {
    if ( errorObject ) {
        return {
            errorCode: 'U-001',
            errorMessage: '未定义错误'
        }
    }
    if ( typeof errorObject === 'string') {
        return {
            errorCode: errorObject,
            errorMessage: errorMessage
        }
    } else {
        return {
            errorCode: errorObject.errorCode,
            errorMessage: errorObject.errorMessage
        }
    }
} ;

handlers.sendSuccess = function () {
    return {
        status: 0,
        message: '操作成功'
    }
} ;

