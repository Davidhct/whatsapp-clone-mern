const express = require('express');
const conversationController = require('./../controllers/conversationController');
const router = express.Router();

router.route('/').post(conversationController.createConversation);
router.route('/:userId').get(conversationController.getUserConversation);
module.exports = router;
