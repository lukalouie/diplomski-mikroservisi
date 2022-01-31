const express = require('express');
const { check } = require('express-validator');

const userController = require('../controller/userController');

const router = express.Router();

router.get('/', userController.getUsers);

router.post(
  '/signup',
  [
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 5 })
  ],
  userController.signup
);

router.post('/login', userController.login);

module.exports = router;
