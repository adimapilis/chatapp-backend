const express = require('express')
const router = express.Router()
const {  getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/usersController')

router.route('/')
  // gets allUsers if admin, get own User if just user
  .get(getAllUsers)
  // .get(verifyRoles("admin","user"), getAllUsers)

// requires the user's id using params
router.route('/:id')
  // gets specific user 
  .get(getUser)

    // requires roles, username and active  in req.body
  // optional oldPassword, newPassword in req.body
  .patch(updateUser)

  // delete user
  .delete(deleteUser)

module.exports = router