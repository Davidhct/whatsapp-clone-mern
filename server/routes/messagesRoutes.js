import express from 'express';

import messagesController from '../controllers/messagesController.js';
const router = express.Router();

// router
//   .route('/')
//   .get(messagesController.getAllMessages)
//   .post(messagesController.createConversation);
// // .patch(messagesController.updatePerson);

router
  .route('/')
  .get(messagesController.getMessage)
  .patch(messagesController.updateMessages);
//   .delete(messagesController.deleteChat);

export default router;
