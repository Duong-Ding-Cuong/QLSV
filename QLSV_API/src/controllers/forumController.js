const {
    createForumService,
    getAllForumsService,
    updateForumService,
    softDeleteForumService,
    hardDeleteForumService
} = require('../services/forumService');

module.exports = {
    
    createForumController: async (req, res) => {
        try {
            const { title, description, expireInHours } = req.body;
    
            if (!expireInHours || expireInHours <= 0) {
                return res.status(400).json({ success: false, message: "Thời gian hết hạn phải lớn hơn 0" });
            }
    
            const topic = await createForumService(title, description, req.student.id, expireInHours);
            res.status(201).json({ success: true, message: "Chủ đề đã được tạo!", topic });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },
    
    getAllForumController: async (req, res) => {
        try {
            const search = req.query.search || ""; 
            const page = parseInt(req.query.page) || 1; 
            const limit = parseInt(req.query.limit) || 10; 

            const data = await getAllForumsService(search, page, limit);

            res.json({ success: true, ...data });
        } catch (error) {
            res.status(500).json({ success: false, message: "Lỗi máy chủ", error: error.message });
        }
    },


    updateForumController: async (req, res) => {
        try {
            const { title, description } = req.body;
            const forum = await updateForumService(req.params.id, title, description);
            res.json({ success: true, message: "Chủ đề đã được cập nhật!", forum });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },


    softDeleteForumController: async (req, res) => {
        try {
            await softDeleteForumService(req.params.id);
            res.json({ success: true, message: "Chủ đề đã được xóa mềm!" });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },


    hardDeleteForumController: async (req, res) => {
        try {
            await hardDeleteForumService(req.params.id);
            res.json({ success: true, message: "Chủ đề đã bị xóa vĩnh viễn!" });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
};
