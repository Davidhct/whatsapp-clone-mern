const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.route('/').get(userController.getUser).post(userController.createUser);

router.route('/:email').get(userController.checkAndGetUser);

module.exports = router;
