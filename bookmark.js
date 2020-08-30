const mongoose =  require('mongoose')
const tag =  require('./tags')
timestamps = require('mongoose-timestamp')

const bookmarkschema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        trim: true
    },
    
    link : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },

    publisher : {
        type : String,
        trim : true,
    },

    tags : [{
            type : mongoose.Types.ObjectId,
            required : true
    }] 

}, {timestamps : true})

const Bookmark = mongoose.model('Bookmark', bookmarkschema)

module.exports = Bookmark