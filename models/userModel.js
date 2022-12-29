const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }],
  refreshToken: {
    type: String,
  },
})

const User = mongoose.model('User', userSchema)
module.exports = User 