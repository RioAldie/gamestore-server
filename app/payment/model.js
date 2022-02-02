const mongoose = require('mongoose');
let paymentScheme = mongoose.Schema({
    type : {
        type: String,
        require: [true, 'tipe pembayaran Harus diisi']
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    banks : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bank'
    }],
    
},  {timestamps : true})

module.exports = mongoose.model('Payment', paymentScheme)