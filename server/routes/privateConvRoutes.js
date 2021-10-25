const express = require('express');

const privateConvController = require('../controllers/privateConvController');
const router = express.Router();

router
  .route('/')
  .get(privateConvController.getAllMessages)
  .post(privateConvController.createMessage);
// .patch(privateConvController.updateMesssages);

router
  .route('/:userId')
  .get(privateConvController.getMessage)
  .patch(privateConvController.updateMesssages);

module.exports = router;
