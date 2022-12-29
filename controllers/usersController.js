const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')


//get all user
const getAllUsers = asyncHandler(async (req, res) => {
  const username = req.username
  // if role is admin, returns all User
  const users = await User.find().select('-password').lean()

  if (!users?.length) {
    return res.status(400).json({message: "No users found"})
  }
  res.json(users)
})

// get specific user
const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id
  const user = await User.findById({_id:id}).select('-password').lean()
  if (!user) {
    return res.status(400).json({message: "No users found"})
  }
  res.json(user)
})


// update user
const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id
  const { addID, deleteID } = req.body

  // data validation
  if (!id || (!addID && !deleteID)) {
    console.log(id, addID,deleteID)
    return res.status(400).json({message: 'All field are required'})
  }

  const toUpdateuser = await User.findById(id).exec()
  
  // check if user exist
  if (!toUpdateuser) {
    return res.status(400).json({message: "User not found"})
  }
  const { friends : currentFriends } = toUpdateuser
  console.log(currentFriends)
  if (deleteID) {
    const deleteFriend = await User.findById(deleteID).exec()
    if (!deleteFriend) return res.status(400).json({message:"friend not found"})
    const newFriends = currentFriends.filter(each=> 
      each.toString()!==deleteID
    )
    toUpdateuser.friends = newFriends
  }
  if (addID) {
    const addFriend = await User.findById(addID).exec()
    if (!addFriend) return res.status(400).json({message:"friend not found"})
    if (currentFriends.includes(addID)) return res.status(400).json({message:"already friend"})
    const newFriends = [...currentFriends, addID]
    toUpdateuser.friends = newFriends
  }
  
  // save user
  const updatedUser = await toUpdateuser.save()
  res.json({ message: `${updatedUser.username} updated`})

})


const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id
  // data validation
  if (!id) {
    return res.status(400).json({message: 'User ID required'})
  }


  
  // delete user
  const user = await User.findById(id).exec()
  if (!user) {
    return res.status(400).json({message : 'User not found'})
  }

  const result = await User.deleteOne()
  res.status(200).json({message: `User ${result.username} with ID ${result.id}`})
})

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
}