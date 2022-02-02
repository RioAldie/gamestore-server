const mongoose = require('mongoose');
let usersSchema = mongoose.Schema({
   
    email : {
        type: String,
        require: [true, 'Email Harus diisi']
    },
    name : {
        type: String,
        require: [true, 'Nama Harus diisi']
    },
    password : {
        type: String,
        require: [true, 'Password Harus diisi']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    phonenumber : {
        type: String,
        require: [true, 'Nomor Telepon Harus diisi']
    },
}, {timestamps : true} )

module.exports = mongoose.model('Users', usersSchema)