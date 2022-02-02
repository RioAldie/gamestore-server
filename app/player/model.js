const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const HASH_ROUND = 10;

let playerSchema = mongoose.Schema({
   
    email : {
        type: String,
        require: [true, 'Email Harus diisi']
    },
    name : {
        type: String,
        require: [true, "nama harus diisi"],
        maxLength: [225, "Panjang antara 3-225 karakter "],
        minLength: [3, "Panjang antara 3-225 karakter"],
    },
    username : {
        type: String,
        require: [true, 'Username Harus diisi'],
        maxLength: [225, "Panjang antara 3-225 karakter "],
        minLength: [3, "Panjang antara 3-225 karakter"],
    },
    password : {
        type: String,
        require: [true, 'Password Harus diisi'],
        maxLength: [225, "Panjang antara 5-225 karakter "],
        minLength: [5, "Panjang antara 5-225 karakter"],
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
    phoneNumber : {
        type: String,
        require: [true, 'Nomor Telepon Harus diisi'],
        maxLength: [13, "Panjang antara 9-13 karakter "],
        minLength: [9, "Panjang antara 9-13 karakter"],
    },
    avatar :{
        type: String
    },
    fileName : {
        type: String
    },
    favorite : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
}, {timestamps : true} )
playerSchema.path('email').validate(async function(value){
    try {
        const count = await this.model('Player').countDocuments({ email: value });
        return !count;
    } catch (error) {
        throw error;
    }
}, attr => `${attr.value} email sudah terdaftar`)

playerSchema.pre('save',function(next){
     this.password = bcrypt.hashSync(this.password, HASH_ROUND)
     next()
})

module.exports = mongoose.model('Player', playerSchema)