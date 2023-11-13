const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'username already exists, must be unique'],
        required: [true, 'must include username'],
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
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    }
}, {timestamps: true});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
      });
  });
 
const User = mongoose.model('User', UserSchema);
 
module.exports = User;