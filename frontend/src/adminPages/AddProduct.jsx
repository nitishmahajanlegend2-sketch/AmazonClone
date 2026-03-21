import React, { useState } from 'react';
//import axios from 'axios';
import './AddProduct.css';
import api from '../axiosInstance'; // Import the configured Axios instance
const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        quantity: '',
        images: '' // Sending as a string URL for now to match your logic
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
           // const token = localStorage.getItem('accessToken');
            
            // Your controller expects these specific field names
           /** const response = await axios.post('http://localhost:8080/admin/addproduct', product, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });*/
            const response = await api.post('/admin/addproduct', product);

            alert(response.data.message);
            // Clear form on success
            setProduct({ name: '', description: '', price: '', category: '', quantity: '', images: '' });
        } catch (error) {
            console.error("Error adding product:", error);
            alert(error.response?.data?.message || "Products can be added by admin only");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-product-container">
            <form className="product-form" onSubmit={handleSubmit}>
                <h2>Add New Product</h2>
                
                <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" name="name" value={product.name} onChange={handleChange} required placeholder="e.g. Sony Headphones" />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={product.description} onChange={handleChange} required placeholder="Describe the product..." />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Price (₹)</label>
                        <input type="number" name="price" value={product.price} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <select name="category" value={product.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Home">Home</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Image URL</label>
                    <input type="text" name="images" value={product.images} onChange={handleChange} required placeholder="https://example.com/image.jpg" />
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Adding..." : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;