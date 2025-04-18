const { sendOtp } = require('../services/otpService');
const Student = require('../models/Student');
const Otp = require('../models/Otp');
const bcrypt = require('bcrypt');

module.exports = {
    forgotPassword: async (req, res) => {
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

    resetPassword: async (req, res) => {
        try {
            const { email, otp, newPassword } = req.body;

            // Kiểm tra OTP có tồn tại không
            const otpRecord = await Otp.findOne({ email, otp });
            if (!otpRecord) return res.status(400).json({ message: "OTP không hợp lệ!" });

            // Kiểm tra OTP hết hạn
            if (otpRecord.expiresAt < new Date()) {
                await Otp.deleteMany({ email });
                return res.status(400).json({ message: "OTP đã hết hạn!" });
            }

            // Mã hóa mật khẩu mới
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Cập nhật mật khẩu cho user
            await Student.findOneAndUpdate({ email }, { password: hashedPassword });

            // Xóa OTP sau khi dùng
            await Otp.deleteMany({ email });

            res.json({ message: "Mật khẩu đã được cập nhật!" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi đặt lại mật khẩu!", error: error.message });
        }
    }
};
