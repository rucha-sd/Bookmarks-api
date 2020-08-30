const mongoose =  require('mongoose')
var timestamps = require('mongoose-timestamp');

const tagSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        trim: true,
        unique : true
    },

}, {timestamps : true})

const Tag  =  mongoose.model('Tag', tagSchema)

module.exports = Tag