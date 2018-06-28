const mongoose = require( './mongodb' ) ;

const Schema  = mongoose.Schema ;

const articleSchema = new Schema( {
    title: String,
    author: String,
    content: String,
    date: { type: Date, default: Date.now() },
    comments: [
        {
            username: String,
            date: Date,
            content: String
        }
    ],
    description: String,
    good: Number,
    noGood: Number,
    original: Boolean,
    form: {
        author: String,
        fromUrl: String
    }
} ) ;

const articleModel = mongoose.model( 'article', articleSchema ) ;

module.exports = {
    articleModel
} ;

