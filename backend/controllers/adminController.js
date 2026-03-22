const mongoose=require('mongoose');
const jwt = require('jsonwebtoken');
const productModel=require('../models/productModel')
const ACCESS_SECRET=process.env.ACCESS_SECRET;
const REFRESH_SECRET=process.env.REFRESH_SECRET;
const adminloginController=(req,res)=>{
    console.log("Reached in login admin")
    const {username,password}=req.body;
    console.log(username,password)
     if(username==process.env.USER_NAME && password==process.env.PASSWORD){
        const user = { name: process.env.USER_NAME, password :process.env.PASSWORD };
        const userc = { name: process.env.USER_NAME };
        const accessToken = jwt.sign(userc, ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(userc, REFRESH_SECRET, { expiresIn: '7d' });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // true in production
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.json({ accessToken, userc });
  }
  res.status(401).json({ message: "Invalid data" });
};
const createrefreshToken = (req,res) => {
   const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

  jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    // Issue a fresh access token
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>Creating token")
    const newAccessToken = jwt.sign(
      { name: decoded.name },
      ACCESS_SECRET,
      { expiresIn: '15m' }
    );
    res.json({ accessToken: newAccessToken });
    console.log(">>>>>>>>>>>>>>>>>>>>created token")
  });}
    
   const verifyJWT = (req, res,next) => {
    console.log('these are headers',req.headers['authorization']?.split(' ')[1])
 const token = req.headers['authorization']?.split(' ')[1];
 
  if (!token) return res.sendStatus(401);

   jwt.verify(token, ACCESS_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        console.log("Token expired")
        // Specifically tell the frontend: "It's just expired, try refreshing!"
        return res.status(403).json({ message: "Expired", type: "TOKEN_EXPIRED" });
      }
      // If the token is fake or tampered with
      console.log("Token invalid")
      return res.status(401).json({ message: "Invalid Token", type: "TOKEN_INVALID" });
    }
    req.user = decoded;
    next();

  
    
  });
};


const addProduct= (req,res)=>{
    console.log("reached before jwt")
    
   console.log("reached after jwt")
    const {name,description,price,category,quantity,images}=req.body;
    if(!name || !description || !price || !category || !quantity || !images){
        return res.status(400).json({message:"All fields are required"});
    }
console.log("Reached before model")
    const newProduct=new productModel({
        name,
        description,
        price,
        category,
        quantity,
        images
    });
    console.log("reached before getting saved")
    newProduct.save()
        .then(product => {
            res.status(201).json({ message: "Product added successfully", product });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Error adding product", error: err });
        });
};

/**

const verifyJWT = (req, res, callback) => { // Added 'callback' parameter
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, ACCESS_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: "Expired", type: "TOKEN_EXPIRED" });
            }
            return res.status(401).json({ message: "Invalid Token", type: "TOKEN_INVALID" });
        }
        
        req.user = decoded;
        callback(); // <--- Run the code passed from addProduct
    });
};

const addProduct = (req, res) => {
    // We pass the actual "Add Product" logic as the 3rd argument (callback)
    verifyJWT(req, res, () => {
        const { name, description, price, category, quantity, images } = req.body;

        if (!name || !description || !price || !category || !quantity || !images) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newProduct = new productModel({
            name, description, price, category, quantity, images
        });

        newProduct.save()
            .then(product => {
                // This only runs if verifyJWT was successful
                res.status(201).json({ message: "Product added successfully", product });
            })
            .catch(err => {
                res.status(500).json({ message: "Error adding product", error: err });
            });
    });
};*/
const deleteProduct=(req,res)=>{
    console.log(req.body)
  
    const {_id}=req.body.data;
    if(!_id){
        return res.status(400).json({message:"Product ID is required"});
    }
    productModel.findByIdAndDelete(_id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json({ message: "Product deleted successfully" });
        })
        .catch(err => {
            res.status(500).json({ message: "Error deleting product", error: err });
        });
}
const getProducts=(req,res)=>{
   
    productModel.find()
        .then(products => {
            console.log(products)
            res.json(products);
        })
        .catch(err => {
            res.status(500).json({ message: "Error fetching products", error: err });
        });
}
module.exports={adminloginController,addProduct,deleteProduct,getProducts,createrefreshToken,verifyJWT}
