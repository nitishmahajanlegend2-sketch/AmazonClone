const {fetchproducts}=require('../controllers/shoppingController')
const express=require('express')
const router=express.Router();

router.get('/getproducts',fetchproducts)

module.exports = router;

