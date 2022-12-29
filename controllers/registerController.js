const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')

const handleNewUser = asyncHandler (async (req,res) => {
  const { username, password } = req.body

  // data validation
  if (!username || !password) {
    console.log("bano")
    return res.status(400).json({message: 'All fields are required'})
  }

  const duplicate = await User.findOne({username})
  if (duplicate) {
    return res.status(400).json({message: "Username Already taken"})
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create and store new user
  const userObject = { username, "password": hashedPassword }
  const user = await User.create(userObject)

  if (user) {
    res.status(200).json({ message: `New user ${username} created`})
  }
  else {
    res.status(400).json({message: 'Invalid data received'})
  }   
})

module.exports = { handleNewUser }