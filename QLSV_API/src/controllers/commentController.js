const commentService = require('../services/commentService');

module.exports = {
    createCommentController: async (req, res) => {
        try {
            const { content, postId } = req.body;
            const newComment = await commentService.createComment(content, postId, req.student.id);
            res.status(201).json({ success: true, message: "Bình luận đã được tạo!", comment: newComment });
        } catch (error) {
            res.status(400).json({ success: false, message: "Lỗi khi tạo bình luận", error: error.message });
        }
    },

    getCommentsByPostController: async (req, res) => {
        try {
            const { postId } = req.params;
            const { page, limit } = req.query;
            const comments = await commentService.getCommentsByPost(postId, parseInt(page), parseInt(limit));
            res.status(200).json({ success: true, ...comments });
        } catch (error) {
            res.status(500).json({ success: false, message: "Lỗi khi lấy bình luận", error: error.message });
        }
    },

    updateCommentController: async (req, res) => {
        try {
            const { commentId } = req.params;
            const { content } = req.body;
            const updatedComment = await commentService.updateComment(commentId, content, req.student.id);
            if (!updatedComment) {
                return res.status(403).json({ success: false, message: "Không thể cập nhật bình luận!" });
            }
            res.json({ success: true, message: "Bình luận đã được cập nhật!", comment: updatedComment });
        } catch (error) {
            res.status(400).json({ success: false, message: "Lỗi khi cập nhật bình luận", error: error.message });
        }
    },

    deleteCommentController: async (req, res) => {
        try {
            const { commentId } = req.params;
            const deletedComment = await commentService.deleteComment(commentId, req.student.id);
            if (!deletedComment) {
                return res.status(403).json({ success: false, message: "Không thể xóa bình luận!" });
            }
            res.json({ success: true, message: "Bình luận đã được xóa!" });
        } catch (error) {
            res.status(400).json({ success: false, message: "Lỗi khi xóa bình luận", error: error.message });
        }
    }
};
