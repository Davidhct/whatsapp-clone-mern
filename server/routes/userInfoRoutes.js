import express from 'express';

import userInfoController from '../controllers/userInfoController.js';
const router = express.Router();

router.route('/').patch(userInfoController.updateUserInfo);
//   .get(userInfoController.getAllMessages)
//   .post(userInfoController.createConversation)

// router
//   .route('/:id')
//   .get(userInfoController.getConversation)
//   .patch(userInfoController.updateConversations)
//   .delete(userInfoController.deleteChat);

// module.exports = router;
export default router;
