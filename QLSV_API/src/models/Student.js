const mongoose_delete = require('mongoose-delete');
const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    student_id: String,
    class: String
}, {
    timestamps: true, // creteAt,updateAt
});
studentSchema.plugin(mongoose_delete, {overrideMethods: "all"});
const student = mongoose.model('student', studentSchema);
module.exports = student;
