const express = require('express');
const { forgotPassword, resetPassword } = require('../controllers/authController');

const passwordRouter = express.Router();

passwordRouter.post('/forgot-password', forgotPassword);
passwordRouter.post('/reset-password', resetPassword);

module.exports = passwordRouter;
