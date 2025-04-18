const Post = require("../models/Post");

module.exports = {
    // Tạo bài viết
    createPostService: async (data) => {
        return await Post.create(data);
    },

    // Lấy danh sách bài viết có phân trang
    getPostsService: async (page = 1, limit = 10) => {
        const skip = (page - 1) * limit;
        const posts = await Post.find()
            .populate("forum", "title")
            .populate("author", "name email")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Post.countDocuments();
        return { posts, total, page, totalPages: Math.ceil(total / limit) };
    },

    // Lấy bài viết theo ID
    getPostByIdService: async (postId) => {
        return await Post.findById(postId)
            .populate("forum", "title")
            .populate("author", "name email");
    },

    // Cập nhật bài viết
    updatePostService: async (postId, data) => {
        return await Post.findByIdAndUpdate(postId, data, { new: true });
    },

    // Xóa bài viết (cập nhật soft delete)
    deletePostService: async (postId) => {
        return await Post.delete({ _id: postId });
    }
};
