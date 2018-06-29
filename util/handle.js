const handles = module.exports ;

const fs = require( 'fs' ) ;
const path = require( 'path' ) ;

handles.articlePosts = function (req, res, next) {
    console.log( req.body.data ) ;
}

handles.articleAdd = function (req, res, next) {

    const data = req.body.data ;
    const dataBuffer = new Buffer( data.imgFile, 'base64' ) ;
    let imgName = `${Date.now()}.${data[ 'fileType' ].split( '/' )[ 1 ]}` ;
    fs.writeFile(`../public/images/articles_img/${imgName}`, dataBuffer, function(err) {
        if(err){
            res.send(err);
        }else{
            res.json( {
                status: 0,
                message: '提交成功'
            } );
        }
    });
}