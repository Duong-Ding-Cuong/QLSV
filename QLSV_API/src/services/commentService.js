const Comment = require('../models/Comment');

module.exports = {
    createComment: async (content, postId, authorId) => {
        return await Comment.create({ content, post: postId, author: authorId });
    },

    getCommentsByPost: async (postId, page = 1, limit = 10) => {
        const skip = (page - 1) * limit;
        const comments = await Comment.find({ post: postId })
            .populate('author', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        
        const total = await Comment.countDocuments({ post: postId });
        
        return {
            comments,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    },

    updateComment: async (commentId, content, authorId) => {
        return await Comment.findOneAndUpdate(
            { _id: commentId, author: authorId }, 
            { content }, 
            { new: true }
        );
    },

    deleteComment: async (commentId, authorId) => {
        return await Comment.findOneAndDelete({ _id: commentId, author: authorId });
    }
};
