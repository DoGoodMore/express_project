const fs = require( 'fs' ) ;

const tools = module.exports;

//删除本地文件或文件夹方法
function deleteall(path) {
    let files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync( path );
        files.forEach(function( file ) {
            const curPath = path + "/" + file;
            if( fs.statSync( curPath ).isDirectory() ) { // recurse
                deleteall( curPath );
            } else { // delete file
                fs.unlinkSync( curPath );
            }
        });
        fs.rmdirSync(path);
    }
}

tools.deleteall = deleteall ;