const { signupValidation, loginValidation } = require('../MiddleWares/AuthValidation');
const {signup,login} = require('../controller/authController');

const router = require('express').Router();



router.post('/signup',signupValidation, signup );
router.post('/login',loginValidation, login);

module.exports=router;