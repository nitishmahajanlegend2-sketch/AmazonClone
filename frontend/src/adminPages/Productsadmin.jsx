import axios from 'axios';
import {useEffect,useState} from 'react';
import Productdetail from './Productdetail'
import { useNavigate } from 'react-router-dom';
import api from '../axiosInstance';
const Productsadmin=()=>{
const [products, setProducts] = useState([]);

 const navigate = useNavigate();


const handleDeleteProduct = async (productId) => {
    // Basic confirmation for safety
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
        const token = localStorage.getItem('accessToken');

        // Note: For DELETE requests with a body, Axios requires this specific structure:
        const response = await api.post('https://amazonclone-20qm.onrender.com/admin/deleteproduct',{data: {
                _id: productId // This matches the const {_id} = req.body in your controller
            }
        });

        if (response.status === 200) {
            alert("Product deleted successfully!");
            
            // OPTIONAL: Update your local state so the product disappears immediately
            // setProducts(products.filter(p => p._id !== productId));
        }
    } catch (error) {
        console.error("Delete Error:", error);
        alert(error.response?.data?.message || "Products can be deleted by admin only");
    }
};
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 1. Grab the token from storage
        const token = localStorage.getItem('accessToken');

        // 2. Make the request with the Authorization header
        const response = await axios.get('https://amazonclone-20qm.onrender.com/admin/getproducts', {
          headers: {
            authorization: `Bearer ${token}` // Matches your .split(' ')[1] logic
          },credentials: 'include'
        });
        console.log("this is products",response.data[0].images[0])

        // 3. Set the data to state
        setProducts(response.data);
      /**  products.map(product=>{
          setimages(product.data[0].images[0])

        })*/
        //setimages(response.data[0])
        
      } catch (error) {
        console.error("Error fetching products:", error.response?.data?.message || error.message);
      
      }
    };

    fetchProducts();
  }, []);
  const handlebutton=()=>{
    
    navigate('/productreg')

  }

  
  return ( 
    <div>
        <div style={{height:'70px'}}><button onClick={handlebutton}>Add Product</button></div>
      {products.map(product => (
        <div key={product._id} style={{display:'flex',gap:'2px'}}>
            <div><img style={{width:'20vw',height:'20vh'}}  src={product.images[0]} alt="product image" /></div>
            <div style={{width:'65vw',height:'30vw'}}><h3>{ product.name}</h3>
          <p>{product.price}</p><p>{product._id}</p><p>{product.quantity}</p><button style={{ backgroundColor: 'red', color: 'white', cursor: 'pointer' }} onClick={()=>handleDeleteProduct(product._id)}>Delete Product</button></div><hr />
        

          
        </div>
      ))}
    </div> 
  )
};


export default Productsadmin;
