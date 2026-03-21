import React, { useState, useEffect } from 'react';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
function Cards({products,setcartnumber,cartnumber,cartlist,setcartlist}) {
    // 1. State to track window width for responsiveness
    const [width, setWidth] = useState(window.innerWidth);
     const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const handlecart=(product)=>{
        const user=localStorage.getItem('user');
        if(!user){
            navigate('/login')
        }
        /**
        else{
        if (cartlist.includes(product)){
           
           product.howmuch=product.howmuch+1
            setcartnumber(cartnumber+1)
        }
        else{
            product.howmuch=1
            setcartlist([...cartlist,product]);
        setcartnumber(cartnumber+1)
        }*/
       else{
         const existingItem = cartlist.find(item => item._id === product._id);

    if (existingItem) {
        // ✅ Already in cart - just increase quantity
        const updatedCart = cartlist.map(item =>
            item._id === product._id
                ? { ...item, howmuch: (item.howmuch || 1) + 1 }
                : item
        );
        setcartlist(updatedCart);
        setcartnumber(cartnumber + 1);
    } else {
        // ✅ New item - add with quantity 1
        setcartlist([...cartlist, { ...product, howmuch: 1 }]);
        setcartnumber(cartnumber + 1);
    }}
}
       

    

    // 2. Logic for Columns
    // Mobile: 2 columns (< 768px) | Desktop: 4 columns
    const isMobile = width < 768;

  /**  const products = [
        { id: 1, title: "Apple iPhone 15 Pro", price: "99,900", rating: 5, image: "https://picsum.photos/200/200?random=1" },
        { id: 2, title: "Sony Noise Cancelling Headphones", price: "24,990", rating: 4, image: "https://picsum.photos/200/200?random=2" },
        { id: 3, title: "Samsung Galaxy Watch 6", price: "32,999", rating: 4, image: "https://picsum.photos/200/200?random=3" },
        { id: 4, title: "Dell XPS 13 Laptop", price: "1,14,000", rating: 5, image: "https://picsum.photos/200/200?random=4" },
        { id: 5, title: "Logitech MX Master 3S", price: "9,495", rating: 3, image: "https://picsum.photos/200/200?random=5" },
        { id: 6, title: "Kindle Paperwhite (16 GB)", price: "13,999", rating: 4, image: "https://picsum.photos/200/200?random=6" },
    ];*/

    const styles = {
        gridContainer: {
            display: 'grid',
            // DYNAMIC: 2 columns for mobile, 4 for desktop
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: '15px',
            padding: isMobile ? '10px' : '20px',
            backgroundColor: '#eaeded'
        },
        card: {
            backgroundColor: '#fff',
            padding: '15px',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '4px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            cursor: 'pointer'
        },
        image: {
            width: '100%',
            height: isMobile ? '150px' : '200px',
            objectFit: 'contain',
            marginBottom: '10px'
        },
        title: {
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: '600',
            marginBottom: '5px',
            height: '40px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
        },
        ratingRow: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
            color: '#ffa41c' // Amazon Gold
        },
        price: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#0f1111',
            marginBottom: '10px'
        },
        button: {
            marginTop: 'auto',
            backgroundColor: '#ffd814',
            border: '1px solid #fcd200',
            borderRadius: '20px',
            padding: '7px 0',
            fontSize: '13px',
            cursor: 'pointer'
        }
    };

    return (
        <div style={styles.gridContainer}>
            {products.map((product) => (
                <div key={product._id} style={styles.card}>
                    <img src={product.images[0]} alt={product.name} style={styles.image} />
                    
                    <div style={styles.title}>{product.name}</div>

                    {/* Rating Stars Logic */}
                    <div style={styles.ratingRow}>
                        {[...Array(5)].map((_, i) => (
                            i < product.rating ? 
                            <StarFilled key={i} /> : 
                            <StarOutlined key={i} style={{color: 'orange'}} />
                        ))}
                        <span style={{color: '#007185', fontSize: '12px', marginLeft: '5px'}}>8,234</span>
                    </div>

                    <div style={styles.price}>
                        <span style={{fontSize: '12px', verticalAlign: 'top', marginRight: '2px'}}>₹</span>
                        {product.price}
                    </div>

                    <button onClick={()=>handlecart(product)} style={styles.button}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
}

export default Cards;