const express = require('express');

const membersController = require('../controllers/membersController');
const router = express.Router();

router.route('/').patch(membersController.updateMembers);
//   .get(membersController.getAllMessages)
//   .post(membersController.createConversation)

// router
//   .route('/:id')
//   .get(membersController.getConversation)
//   .patch(membersController.updateConversations)
//   .delete(membersController.deleteChat);

module.exports = router;
