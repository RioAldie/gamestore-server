const mongoose = require('mongoose');
let nominalScheme = mongoose.Schema({
    coinQuantity : {
        type: Number,
        default: 0
    },
    coinName : {
        type: String,
        require: [true, 'nama koin Harus diisi']
    },
    price: {
        type: Number,
        default: 0
    }
},  {timestamps : true})

module.exports = mongoose.model('Nominal', nominalScheme)