// ----------------CATEGORY SCHEMA---------------------

const mongo = require('mongoose');
module.exports = new mongo.model('category', {
  name: {
    type: String,
    unique: true
  },
  discription: String
}
)