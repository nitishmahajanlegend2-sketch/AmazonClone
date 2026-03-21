const express=require('express')
const {verifyJWT2,getproductpage,refreshAccessTokenUser,seeOrders,createOrder,cancelOrder,onlinepayment}=require('../controllers/shoppingController')
const {logoutController}=require('../controllers/userController')
const router=express.Router();
router.post('/getnewtoken',refreshAccessTokenUser)
router.use(verifyJWT2);
router.post('/productpage',getproductpage);
console.log('reached router')
router.post('/createorder',createOrder)

router.post('/seeorders',seeOrders)
router.post('/cancelorder',cancelOrder)
router.post('/user/logout',logoutController)
router.post('/doonlinepayment',onlinepayment)
module.exports = router;

