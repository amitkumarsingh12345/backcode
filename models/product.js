// ----------------PRODUCT SCHEMA---------------------

const mongo = require('mongoose');
module.exports = new mongo.model('product', {
    name: String,
    price: Number,
    category: String,
    image: String,
    qty: {
        type: String,
        default: 1
    },
    discription: String
});

