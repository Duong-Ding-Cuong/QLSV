const mongoose_delete = require('mongoose-delete');
const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    content: String,
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    }
}, {timestamps: true});
commentSchema.plugin(mongoose_delete, {overrideMethods: "all"});
const comment = mongoose.model('comment', commentSchema);
module.exports = comment;
