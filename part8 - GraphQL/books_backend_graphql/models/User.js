const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  favoriteGenre: String
})

schema.plugin(validator)
module.exports = mongoose.model('User', schema)
