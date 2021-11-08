const express = require('express');

const conversationController = require('../controllers/conversationController');
const router = express.Router();

router
  .route('/')
  .get(conversationController.getAllMessages)
  .post(conversationController.createMessage)
  .patch(conversationController.updatePerson);

router
  .route('/:id')
  .get(conversationController.getMessage)
  .patch(conversationController.updateMesssages)
  .delete(conversationController.deleteChat);

module.exports = router;
