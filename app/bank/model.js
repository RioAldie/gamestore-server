const mongoose = require('mongoose');
let bankScheme = mongoose.Schema({
    name : {
        type: String,
        require: [true, 'Nama pemilik Harus diisi']
    },
    bankName : {
        type: String,
        require: [true, 'Nama Bank Harus diisi']
    },
    nomorRekening : {
        type: String,
        require: [true, 'Nomor Rekening Harus diisi']
    },
    
})

module.exports = mongoose.model('Bank', bankScheme)