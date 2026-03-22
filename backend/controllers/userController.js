const userModel=require('../models/userModel');
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
/**
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
*/
const registerController=async(req,res)=>{
    try {
        const { fullName, email, password } = req.body;
        console.log(fullName,email,password)

        // 1. Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // 2. Hash the password
        // '10' is the saltRounds (the cost factor). 10 is the industry standard.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('reached after hashed password',hashedPassword)


        // 3. Save the user with the HASHED password
        const newUser = new userModel({
            fullName,
            email,
            password: hashedPassword // Save this, NOT the plain password
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.log('reached in error statement',error)
        res.status(500).json({ message: "Server error", error });
    }
}


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        // 1. Verify Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // 2. Create Access Token (Short-lived: 15 minutes)
        const accessTokenuser = jwt.sign(
            { id: user._id },
            process.env.ACCESS_SECRET2,
            { expiresIn: '15m' }
        );

        // 3. Create Refresh Token (Long-lived: 7 days)
        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_SECRET2,
            { expiresIn: '7d' }
        );
        console.log("Refresh token",refreshToken)

        // 4. Store Refresh Token in an HTTP-only Cookie
        res.cookie('refreshTokenuser', refreshToken, {
            httpOnly: true,    // Prevents JavaScript access (XSS protection)
            secure: true,     // Set to true in production (HTTPS)
            sameSite: 'None',   // Protection against CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
        });
        console.log("refreshtokencreated")

        // 5. Send Access Token and User info as JSON
        res.status(200).json({
            message: "Login successful",
            accessTokenuser,
            user: { id: user._id, fullName: user.fullName, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
const logoutController=async(req,res)=>{
    try {
        console.log("Reached before deletion")
        res.clearCookie('refreshTokenuser', {
            httpOnly: true,
            secure: true, // true in production
            sameSite: 'None'
        });
        res.status(200).json({ message: "Logged out successfully" });
        console.log("Reached after deletion")
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}
module.exports={registerController,loginController,logoutController}
