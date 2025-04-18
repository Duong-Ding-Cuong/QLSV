const {registerStudent, loginStudent, restoreStudentService, deleteStudentService, updateStudentService, getStudentByIdService, getStudentsService} = require('../services/studentService');
module.exports = {
    createStudent: async (req, res) => {
        try {
            const {
                name,
                email,
                password,
                student_id,
                class: studentClass
            } = req.body;
            const response = await registerStudent({
                name,
                email,
                password,
                student_id,
                studentClass
            });
            return res.status(201).json({errorCode: 0, data: response});
        } catch (error) {
            res.status(500).json({message: "Lỗi đăng ký!", error: error.message});
        }
    },
    loginStudentController: async (req, res) => {
        try {
            const {email, password} = req.body;
            const response = await loginStudent({email, password});
            res.status(200).json(response);
        } catch (error) {
            res.status(401).json({message: "Lỗi đăng nhập!", error: error.message});
        }
    },
    forgotPassword : async (req, res) => {
        try {
            const { email } = req.body;
    
            // Kiểm tra email có tồn tại không
            const student = await Student.findOne({ email });
            if (!student) return res.status(404).json({ message: "Email không tồn tại!" });
    
            // Gửi OTP
            const response = await sendOtp(email);
            return res.json(response);
        } catch (error) {
            res.status(500).json({ message: "Lỗi quên mật khẩu!", error: error.message });
        }
    },
    resetPassword : async (req, res) => {
        try {
            const { email, otp, newPassword } = req.body;
    
            // Kiểm tra OTP có tồn tại không
            const otpRecord = await Otp.findOne({ email, otp });
            if (!otpRecord) return res.status(400).json({ message: "OTP không hợp lệ!" });
    
            // Kiểm tra OTP hết hạn
            if (otpRecord.expiresAt < new Date()) return res.status(400).json({ message: "OTP đã hết hạn!" });
    
            // Mã hóa mật khẩu mới
            const hashedPassword = await bcrypt.hash(newPassword, 10);
    
            // Cập nhật mật khẩu cho user
            await Student.findOneAndUpdate({ email }, { password: hashedPassword });
    
            // Xóa OTP sau khi dùng
            await Otp.deleteOne({ _id: otpRecord._id });
    
            res.json({ message: "Mật khẩu đã được cập nhật!" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi đặt lại mật khẩu!", error: error.message });
        }
    },
     // Lấy danh sách sinh viên (phân trang)
     getStudentsController: async (req, res) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const data = await getStudentsService(parseInt(page), parseInt(limit));
            res.status(200).json({ success: true, ...data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // Lấy thông tin sinh viên theo ID
    getStudentByIdController: async (req, res) => {
        try {
            const student = await getStudentByIdService(req.params.id);
            if (!student) return res.status(404).json({ success: false, message: "Không tìm thấy sinh viên!" });
            res.status(200).json({ success: true, student });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // Cập nhật thông tin sinh viên
    updateStudentController: async (req, res) => {
        try {
            const student = await updateStudentService(req.params.id, req.body);
            if (!student) return res.status(404).json({ success: false, message: "Không tìm thấy sinh viên!" });
            res.status(200).json({ success: true, message: "Cập nhật thành công!", student });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },

    // Xóa mềm sinh viên
    deleteStudentController: async (req, res) => {
        try {
            await deleteStudentService(req.params.id);
            res.status(200).json({ success: true, message: "Sinh viên đã được xóa!" });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },

    // Khôi phục sinh viên đã bị xóa mềm
    restoreStudentController: async (req, res) => {
        try {
            await restoreStudentService(req.params.id);
            res.status(200).json({ success: true, message: "Sinh viên đã được khôi phục!" });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}
