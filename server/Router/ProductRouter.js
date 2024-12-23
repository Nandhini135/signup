 
const router = require('express').Router();
const loginValidation =require('../MiddleWares/AuthValidation')
const ensureAuthenticated =require('../MiddleWares/Auth')
 router.get('/',ensureAuthenticated,(req,res)=>{
  
    console.log('-----Logged in user detail-----',req.user);
    
    res.status(200).json([
      {
          "name": "mobile",
          "price": "10000"
      },
      {
          "name": "TV",
          "price": "50000"
      }
  ]);
  
 })
// router.post('/login',loginValidation, login);

module.exports=router;