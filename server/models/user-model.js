const mongoose = require('mongoose');
 
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: [6, "username must be at least 6 chars {VALUE}"]
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "password must be at least 8 chars {VALUE}"]
    },
    email: {
        type: String,
        required: true,
        minLength: [8, "email must be at least 8 chars {VALUE}"]
    }
}, {timestamps: true});
 
const User = mongoose.model('User', UserSchema);
 
module.exports = User;