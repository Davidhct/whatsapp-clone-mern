import express from 'express';

import conversationController from '../controllers/conversationController.js';
const router = express.Router();

router
  .route('/')
  .get(conversationController.getAllMessages)
  .post(conversationController.createConversation);
// .patch(conversationController.updatePerson);

router
  .route('/:id')
  .get(conversationController.getConversation)
  .patch(conversationController.updateConversations)
  .delete(conversationController.deleteChat);

export default router;
