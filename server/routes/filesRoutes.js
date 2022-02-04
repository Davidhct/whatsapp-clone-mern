import express from 'express';
// import upload from '../server.js';
import filesController from '../controllers/filesController.js';
const router = express.Router();

router.route('/').patch(filesController.updateFiles);
//   .get(adminController.getAllMessages)
//   .post(adminController.createConversation)

// router
//   .route('/:id')
//   .get(adminController.getConversation)
//   .patch(adminController.updateConversations)
//   .delete(adminController.deleteChat);

// module.exports = router;
export default router;
