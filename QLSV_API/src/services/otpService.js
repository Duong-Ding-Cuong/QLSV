const Otp = require('../models/Otp');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Cấu hình dịch vụ email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS 
    }
});

module.exports = {
    sendOtp: async (email) => {
        try {
            const otpCode = crypto.randomInt(100000, 999999).toString();
            const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Hết hạn sau 5 phút

            // Xóa OTP cũ nếu có
            await Otp.deleteMany({ email });

            // Lưu OTP vào database
            await Otp.create({ email, otp: otpCode, expiresAt });

            // Gửi email OTP
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Mã OTP đặt lại mật khẩu',
                text: `Mã OTP của bạn là: ${otpCode}. Mã sẽ hết hạn sau 5 phút.`
            });

            return { success: true, message: 'OTP đã được gửi!' };
        } catch (error) {
            return { success: false, message: 'Lỗi khi gửi OTP', error: error.message };
        }
    }
};
