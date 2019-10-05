const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    sex: { type: String, required: true },
    occupation: { type: String, required: true },
    
});
const Staff = mongoose.model('Staff', StudentSchema)
module.exports = Staff;