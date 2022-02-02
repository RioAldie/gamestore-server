const mongoose = require('mongoose');
let transactionSchema = mongoose.Schema({
    historyVoucherTopup: {
        gameName : {type: String, require: [true, "Nama Game Harus diisi "] },
        category : {type: String, require: [true, "Nama kategori Harus diisi "] },
        thumbnail: {type: String},
        coinName : {type: String, require: [true, "Koin Game Harus diisi "] },
        coinQuantity : {type: String, require: [true, "Jumlah koin Harus diisi "] },
        price: {type: Number}
    },
    historyPayment: {
        name : {type: String, require: [true, "Nama Harus diisi "] },
        type : {type: String, require: [true, "Tipe pembayaran Harus diisi "] },
        bankName : {type: String, require: [true, "Nama Bank Harus diisi "] },
        nomorRekening : {type: String, require: [true, "Nomor rekening Harus diisi "] },
    },
    name : {
        type: String,
        require: [true, 'nama Harus diisi'],
        maxLength: [225, "Panjang harus 3-225 kata"],
        minLength: [3, "Panjang harus 3-225 kata"]
    },
    accountUser : {
        type: String,
        require: [true, 'nama Akun Harus diisi'],
        maxLength: [225, "Panjang harus 3-225 kata"],
        minLength: [3, "Panjang harus 3-225 kata"]
    },
    tax : {
        type: Number,
        default: 0
    },
    value : {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },
    player : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    historyUser: {
        gameName : {type: String, require: [true, "Nama Game Harus diisi "] },
        phoneNumber: {
            type: String,
            require: [true, "nomor telepon harus diisi"],
            maxLength: [13, "Panjang harus 9-13 "],
            minLength: [9, "Panjang harus 9-13 "],
        }
    },
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
},  {timestamps : true})

module.exports = mongoose.model('Transaction', transactionSchema)