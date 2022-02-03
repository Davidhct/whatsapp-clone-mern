import express from 'express';
import userController from '../controllers/userController.js';
const router = express.Router();

router
  .route('/')
  .get(userController.getUser)
  .post(userController.createUser)
  .put(userController.checkAndGetGroupUsers);

router.route('/:email').get(userController.checkAndGetUser);

// module.exports = router;
export default router;
