const express=require('express')
const router=express.Router();
const {adminloginController,addProduct,deleteProduct,getProducts,createrefreshToken,verifyJWT}=require('../controllers/adminController')
//routers
router.post('/login',adminloginController);
router.post('/deleteproduct',verifyJWT,deleteProduct);
router.post('/addproduct',verifyJWT,addProduct);
router.get('/getproducts',getProducts);
router.post('/createrefreshtoken',createrefreshToken);

module.exports = router;
