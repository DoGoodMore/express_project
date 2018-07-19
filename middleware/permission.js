const needTokenList = require( '../list/tokenRequestList' ).needTokenRequest ;

module.exports = function (req, res, next) {
    console.log( req )
    next() ;
} ;