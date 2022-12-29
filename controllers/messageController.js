const Message = require('../models/messageModel')

const asyncHandler = require('express-async-handler')

const createNewMessage = asyncHandler (async  (req,res) => {
  const { chatId, senderId, text } = req.body

   const message = await Message.create({chatId, senderId, text})
   if (message) {
     res.status(200).json({ message: `New message is created`})
   }
   else {
     res.status(400).json({message: 'Invalid data received'})
   }  
})

const getAllMessage = asyncHandler (async  (req,res) => {

  const message = await Message.find().lean()
  if (!message?.length) {
    return res.status(200).json([])
  }
  res.json(message)
})

const getChatMessage = asyncHandler (async  (req,res) => {
  const { id : chatId } = req.params

  const message = await Message.find({chatId}).lean()
  if (!message?.length) {
    return res.status(200).json([])
  }
  res.json(message)
})

const deleteMessage = asyncHandler (async  (req,res) => {
  const { id } = req.params
  console.log(id)
  const message = await Message.findById(id).exec()
  if (!message) {
    return res.status(400).json({message: "No chat found"})
  }
  const result = await Message.deleteOne()
  res.status(200).json({message: `Note is deleted`})
})

module.exports = { createNewMessage, getAllMessage, getChatMessage, deleteMessage }