const mongoose = require('mongoose');
let voucherScheme = mongoose.Schema({
   name : {
       type: String,
       require: [true, 'Nama Harus di isi']
   },
   status: {
       type: String,
       enum: ['Y', 'N'],
       default: 'Y'
   },
   thumbnail:{
       type: String
   },
   category: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Category'
   },
   nominals: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Nominal'
   }],
   payments : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
   }],
   user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Users'
   }
},  {timestamps : true})

module.exports = mongoose.model('Voucher', voucherScheme);