const {
    createPostService,
    getPostsService,
    getPostByIdService,
    updatePostService,
    deletePostService
} = require("../services/postService");
const { uploadSingleFile } = require('../services/fileService');
module.exports = {
    // Tạo bài viết
    createPostController: async (req, res) => {
        try {
          const { title, content, forum } = req.body;
          const author = req.student.id;
          let image = null;
    
          if (req.files && req.files.image) {
            const result = await uploadSingleFile(req.files.image);
            if (result.status !== "success") {
              return res.status(400).json({
                success: false,
                message: "Lỗi tải lên ảnh!",
                error: result.error,
              });
            }
            image = result.path; // URL từ Cloudinary
          } else {
            console.log("No image file provided in request");
          }
    
          const newPost = await createPostService({ title, content, forum, author, image });
    
          res.status(201).json({
            success: true,
            message: "Bài viết đã được tạo!",
            post: newPost,
          });
        } catch (error) {
          console.error("Create post error:", error);
          res.status(400).json({
            success: false,
            message: "Lỗi tạo bài viết!",
            error: error.message,
          });
        }
      },

    // Lấy danh sách bài viết
    getPostsController: async (req, res) => {
        try {
            const {page, limit} = req.query;
            const data = await getPostsService(Number(page) || 1, Number(limit) || 10);

            res.status(200).json({
                success: true,
                ... data
            });
        } catch (error) {
            res.status(500).json({success: false, message: "Lỗi lấy bài viết!", error: error.message});
        }
    },

    // Lấy bài viết theo ID
    getPostByIdController: async (req, res) => {
        try {
            const {id} = req.params;
            const post = await getPostByIdService(id);

            if (! post) {
                return res.status(404).json({success: false, message: "Bài viết không tồn tại!"});
            }

            res.status(200).json({success: true, post});
        } catch (error) {
            res.status(500).json({success: false, message: "Lỗi lấy bài viết!", error: error.message});
        }
    },

    // Cập nhật bài viết
    updatePostController: async (req, res) => {
        try {
            const {id} = req.params;
            const updatedPost = await updatePostService(id, req.body);

            if (! updatedPost) {
                return res.status(404).json({success: false, message: "Bài viết không tồn tại!"});
            }

            res.status(200).json({success: true, message: "Bài viết đã được cập nhật!", post: updatedPost});
        } catch (error) {
            res.status(500).json({success: false, message: "Lỗi cập nhật bài viết!", error: error.message});
        }
    },

    // Xóa bài viết (soft delete)
    deletePostController: async (req, res) => {
        try {
            const {id} = req.params;
            await deletePostService(id);
            res.status(200).json({success: true, message: "Bài viết đã bị xóa!"});
        } catch (error) {
            res.status(500).json({success: false, message: "Lỗi xóa bài viết!", error: error.message});
        }
    }
};
