const express = require('express')
const router = express.Router()
const { createNewMessage, getAllMessage, getChatMessage, deleteMessage } = require('../controllers/messageController')

router.route('/')
  .post(createNewMessage) 
  .get(getAllMessage)

router.route('/:id')
  .get(getChatMessage) 
  .delete(deleteMessage)

module.exports = router
