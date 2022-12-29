const Chat = require('../models/chatModel')

const asyncHandler = require('express-async-handler')


const createNewChat = asyncHandler (async  (req,res) => {
  const { senderId, receiverId } = req.body

   const chat = await Chat.create({ members : [senderId, receiverId]})
   if (chat) {
     res.status(200).json({ message: `New message is created`, data: chat._id})
   }
   else {
     res.status(400).json({message: 'Invalid data received'})
   }  
})

const getAllChat = asyncHandler (async  (req,res) => {

  const chat = await Chat.find().lean()
  if (!chat?.length) {
    return res.json([])
  }
  res.json(chat)
})

const getUserChat = asyncHandler (async  (req,res) => {
  const id = req.params.id

  const chat = await Chat.find({
    members:{$in: id}
  }).lean()
  if (!chat?.length) {
    return res.json([])
  }
  res.json(chat)
})

const getSpecificChat = asyncHandler (async  (req,res) => {
  const { id1, id2 } = req.params
  const chat = await Chat.find({members:{$all: [id1, id2]}}).lean()
  if (!chat?.length) {
    return res.json([])
  }
  res.json(chat)
})

const deleteChat = asyncHandler (async  (req,res) => {
  const id = req.params.id

  const chat = await Chat.findById(id).exec()
  if (!chat) {
    return res.status(400).json({message: "No message found"})
  }
  const result = await Chat.deleteOne()
  res.status(200).json({message: `message is deleted`})
})

module.exports = { getSpecificChat, createNewChat, getUserChat, getAllChat, deleteChat }