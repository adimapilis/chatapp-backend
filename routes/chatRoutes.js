const express = require('express')
const router = express.Router()
const { createNewChat, getUserChat, getAllChat, deleteChat, getSpecificChat } = require('../controllers/chatController')

router.route('/')
  .post(createNewChat) 
  .get(getAllChat)

router.route('/:id')
  .get(getUserChat) 
  .delete(deleteChat)

router.route('/:id1/:id2')
  .get(getSpecificChat)
module.exports = router