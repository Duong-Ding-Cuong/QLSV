const Forum = require('../models/Forum');

module.exports = {

    createForumService: async (title, description, studentId, expireInHours) => {
        try {
            if (!expireInHours || expireInHours <= 0) {
                throw new Error("Thời gian hết hạn phải lớn hơn 0");
            }
    
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + expireInHours);
    
            const now = new Date();
            if (expiresAt <= now) {
                throw new Error("Thời gian hết hạn không hợp lệ");
            }
    
            const forum = await Forum.create({
                title,
                description,
                createdBy: studentId,
                expiresAt
            });
    
            return forum;
        } catch (error) {
            console.error("Lỗi khi tạo chủ đề:", error);
            throw error;
        }
    },
    getAllForumsService: async (search = "", page = 1, limit = 10) => {
        try {
            const query = search ? { title: new RegExp(search, "i") } : {}; 

            const total = await Forum.countDocuments(query); 
            const forums = await Forum.find(query)
                .populate('createdBy', 'name email')
                .skip((page - 1) * limit) 
                .limit(limit) 
                .sort({ createdAt: -1 }); 

            return { forums, total, page, totalPages: Math.ceil(total / limit) };
        } catch (error) {
            throw error;
        }
    },

    updateForumService: async (forumId, title, description) => {
        return await Forum.findByIdAndUpdate(forumId, { title, description }, { new: true });
    },

  
    softDeleteForumService: async (forumId) => {
        return await Forum.delete({ _id: forumId });
    },

    hardDeleteForumService: async (forumId) => {
        return await Forum.deleteOne({ _id: forumId });
    }
};
