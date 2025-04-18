const mongoose_delete = require('mongoose-delete');
const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    forum: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'forum'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    },
    image: String,
}, {timestamps: true});
postSchema.plugin(mongoose_delete, {overrideMethods: "all"});
const post = mongoose.model('post', postSchema);
module.exports = post;
