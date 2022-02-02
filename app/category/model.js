const mongoose = require('mongoose');
let categoryScheme = mongoose.Schema({
    name: {
        type: String,
        require : [true, 'Nama Kategori Harus diisi']
    }
},  {timestamps : true})

module.exports = mongoose.model('Category', categoryScheme)