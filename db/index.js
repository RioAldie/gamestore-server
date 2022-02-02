const mongoose = require('mongoose');
const {urlDB} = require('../config');

mongoose.connect(urlDB, {
    useUnifiedTopology: true, 
})

const db = mongoose.connection

module.exports = db