const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    sex: { type: String, required: true },
    faculty: { type: String, required: true },
    department: { type: String, required: true },
    level: { type: String, required: true }
});
const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;