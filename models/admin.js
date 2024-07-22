// ----------------ADMIN SCHEMA---------------------

const mongo = require('mongoose');
module.exports = new mongo.model('admin', {
    name: String,
    password: String
})

