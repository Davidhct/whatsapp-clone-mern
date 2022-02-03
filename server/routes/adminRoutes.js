import express from 'express';

import adminController from '../controllers/adminController.js';
const router = express.Router();

router.route('/').patch(adminController.updateAdmin);
//   .get(adminController.getAllMessages)
//   .post(adminController.createConversation)

// router
//   .route('/:id')
//   .get(adminController.getConversation)
//   .patch(adminController.updateConversations)
//   .delete(adminController.deleteChat);

// module.exports = router;
export default router;
