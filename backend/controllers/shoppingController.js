const productModel=require('../models/productModel')
const orderModel=require('../models/orderModel')
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const verifyJWT2 = (req, res, next) => {
    // 1. Get the token from the Authorization header
    // Header format: "Bearer <accessTokenuser>"
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ 
            success: false, 
            message: "Unauthorized: No user token provided" 
        });
    }

    // 2. Extract the actual token string
    const accessTokenuser = authHeader.split(' ')[1];
    console.log(accessTokenuser)

    // 3. Verify the token using the USER specific access secret
    jwt.verify(
        accessTokenuser, 
        process.env.ACCESS_SECRET2, 
        (err, decoded) => {
            if (err) {
                // Return 403 so the frontend interceptor knows to call the refresh-token route
                return res.status(403).json({ 
                    success: false, 
                    message: "Forbidden: User token expired or invalid" 
                });
            }
            console.log("Reached before decoded")

            // 4. Attach the decoded user data (id, etc.) to the request object
            // This allows your controllers to use req.user.id
            req._id = decoded.id;
            console.log(req._id)
            
            // 5. Move to the next middleware or controller
            next();
        }
    );
};


const fetchproducts=async(req,res)=>{
   const products=await productModel.find();
   console.log("these are the products",products)
   res.json(products);}

const getproductpage=async(req,res)=>{
    const {id}=req.body;
    const product=await productModel.findById(id);
    res.json(product);
}



const createOrder = async (req,res) => {
    try {
        // Destructuring all fields from req.body as requested
        const { userId, products, totalAmount, shippingAddress, paymentStatus } = req.body;
        console.log(userId, products, totalAmount, shippingAddress, paymentStatus);

        // 1. Basic Validation
        if (!userId || !products || !totalAmount || !shippingAddress) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields: userId, products, totalAmount, and shippingAddress are mandatory." 
            });
        }

        // 2. Create the Order document
        const newOrder = new orderModel({
            userId,           // Using userId from req.body
            products,         // Array of { productId, quantity }
            totalAmount,
            shippingAddress,
            paymentStatus: paymentStatus || 'Pending' // Uses provided status or defaults to Pending
        });

        // 3. Save the order to MongoDB
        const savedOrder = await newOrder.save();

        // 4. Link this order to the User's document
        // This ensures the user can see this order in their "My Orders" section
       

        // 5. Send Response
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order: savedOrder
        });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};


const refreshAccessTokenUser = async (req, res) => {
    try {
        // 1. Get the specific user refresh token from cookies
        const refreshTokenuser = req.cookies.refreshTokenuser;

        if (!refreshTokenuser) {
            return res.status(401).json({ message: "Refresh token missing. Please login." });
        }

        // 2. Verify the token using the USER specific refresh secret
        console.log("This final test has started")
        jwt.verify(
            refreshTokenuser, 
            process.env.REFRESH_SECRET2, 
            (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "Invalid or expired refresh token" });
                }

                // 3. If valid, generate a new Access Token
                const accessTokenuser = jwt.sign(
                    { id: decoded.id }, 
                    process.env.ACCESS_SECRET2, 
                    { expiresIn: '15m' }
                );

                // 4. Send the new access token back to the frontend
                res.status(200).json({
                    success: true,
                    accessTokenuser: accessTokenuser // Frontend will save this to localStorage
                });
                console.log("The final test is successful")
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Server error during token refresh", error: error.message });
    }
};


const seeOrders = async (req, res) => {
    try {
        // You can get userId from req.params (e.g., /orders/:userId) 
        // or req.body depending on your frontend setup
        const { userId } = req.body; 

        if (!userId) {
            return res.status(400).json({ message: "User ID is required to fetch orders." });
        }

        // Find orders and "populate" the product details
        const orders = await orderModel.find({ userId })
            .populate('products.productId', 'name price images') // Only fetch name, price, and images
            .sort({ createdAt: -1 }); // Show newest orders first

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to retrieve orders", 
            error: error.message 
        });
    }
};




const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        // 1. Validation
        if (!orderId) {
            return res.status(400).json({ message: "Order ID is required to cancel an order." });
        }

        // 2. Find and Delete the order
        // findByIdAndDelete is the most direct way to remove the record
        const deletedOrder = await orderModel.findByIdAndDelete(orderId);

        // 3. Check if the order actually existed
        if (!deletedOrder) {
            return res.status(404).json({ 
                success: false, 
                message: "Order not found. It may have already been cancelled." 
            });
        }

        // 4. Success Response
        res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            cancelledOrderId: orderId
        });

    } catch (error) {
        console.error("Error cancelling order:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};
const Razorpay = require('razorpay');
const razorpay = new Razorpay({
  key_id: process.env.KEY_ID, 
  key_secret: process.env.KEY_SECRET,
});
const onlinepayment=async(req,res)=>{
    console.log(req.body)
    try {
    const options = {
      amount: req.body.amount * 100, // Amount in paise (100 paise = 1 INR)
      currency: "INR",
      receipt: "receipt_123",
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}



module.exports={fetchproducts,verifyJWT2,getproductpage,refreshAccessTokenUser,seeOrders,createOrder,cancelOrder,onlinepayment}