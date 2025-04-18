const aqp = require('api-query-params');
const Student = require('../models/Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    registerStudent: async (
        {
            name,
            email,
            password,
            student_id,
            studentClass
        }
    ) => { // Kiểm tra xem email đã tồn tại chưa
        let existingStudent = await Student.findOne({email});
        if (existingStudent) 
            throw new Error("Email đã được đăng ký!");
        


        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo sinh viên mới
        const newStudent = new Student({
            name,
            email,
            password: hashedPassword,
            student_id,
            class: studentClass
        });

        await newStudent.save();
        return {message: "Đăng ký thành công!"};
    },
    loginStudent: async (
        {email, password}
    ) => {
        const student = await Student.findOne({email});

        if (! student) {
            throw new Error("Email không tồn tại!");
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (! isMatch) {
            throw new Error("Mật khẩu không đúng!");
        }

        // 🔥 Tạo token ở đây
        const token = jwt.sign({
            id: student._id,
            email: student.email
        }, process.env.JWT_SECRET, {expiresIn: "7d"});
        console.log("Generated Token:", token);
        return {message: "Đăng nhập thành công!", token,id: student._id, name: student.name,email:student.email,studentId:student.student_id,studentClas:student.class };
    },
    // Lấy danh sách sinh viên (hỗ trợ phân trang)
    getStudentsService: async (page = 1, limit = 10) => {
        const skip = (page - 1) * limit;
        const students = await Student.find().skip(skip).limit(limit);
        const total = await Student.countDocuments();
        return {
            students,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    },

    // Lấy thông tin sinh viên theo ID
    getStudentByIdService: async (id) => {
        return await Student.findById(id);
    },

    // Cập nhật thông tin sinh viên
    updateStudentService: async (id, updateData) => {
        return await Student.findByIdAndUpdate(id, updateData, {new: true});
    },

    // Xóa mềm sinh viên
    deleteStudentService: async (id) => {
        return await Student.deleteById(id);
    },

    // Khôi phục sinh viên đã xoá mềm
    restoreStudentService: async (id) => {
        return await Student.restore({_id: id});
    }

}
