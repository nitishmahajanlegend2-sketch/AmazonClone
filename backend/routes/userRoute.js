const express=require('express')
const router=express.Router();
const {loginController,registerController,logoutController}=require('../controllers/userController')
//routers
const {verifyJWT2}=require('../controllers/shoppingController')
router.post('/login',loginController);
console.log('reached router user route')
router.post('/register',registerController)

module.exports = router;
