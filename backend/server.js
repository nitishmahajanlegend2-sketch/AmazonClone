const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv=require('dotenv');
const path = require('path');
const dns = require('dns');
// Use Google DNS to bypass local DNS issues
dns.setServers(['8.8.8.8', '8.8.4.4']);
const connectDb = require('./config/ConnectDb');
dotenv.config();
connectDb();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors({origin:'https://amazon-clone-gold-pi.vercel.app' credentials: true}));

app.use('/user',require('./routes/userRoute'))
app.use('/admin',require('./routes/adminRoute'))
app.use('/nshopping',require('./routes/handleShopping'));

app.use('/sshopping',require('./routes/handlesShopping'));
const PORT=8080 || process.env.PORT
//listening
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})
