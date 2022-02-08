import express from 'express';

import membersController from '../controllers/membersController.js';
const router = express.Router();

router
  .route('/')
  .get(membersController.getAllMembers)
  .patch(membersController.updateMembers);
//   .get(membersController.getAllMessages)
//   .post(membersController.createConversation)

// router
//   .route('/:id')
//   .get(membersController.getConversation)
//   .patch(membersController.updateConversations)
//   .delete(membersController.deleteChat);

// module.exports = router;
export default router;
