const mongoose=require('mongoose');


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Please enter product description"]
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
    default: 0
  },
  category: {
    type: String,
    required: [true, "Please enter product category"]
  },
  quantity: { // Often called 'Stock' in e-commerce
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1
  },
 images: {
        type: [String], 
        required: [true, "At least one product image is required"],
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: "A product must have at least one image."
        }
    },
  createdAt: {
    type: Date,
    default: Date.now
  }
},{timestamps:true});


const productModel=mongoose.model('products',productSchema)
module.exports=productModel;