import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';

const Checkout = ({ cartlist, setcartlist,setcartnumber ,cartnumber,orderdata,setorderdata}) => {
    const navigate = useNavigate();


    // 1. Calculate Totals
    const subtotal = cartlist.reduce((acc, item) => acc + (Number(String(item.price).replace(/,/g, '')) * (item.howmuch || 1)), 0);
    const totalItems = cartlist.reduce((acc, item) => acc + (item.howmuch || 1), 0);

    // 2. Remove Item Logic
    const removeFromCart = (item) => {
        const id=item._id;
        const n=item.howmuch;
        const updatedCart = cartlist.filter(item => item._id !== id);
        setcartlist(updatedCart);
        setcartnumber(cartnumber-n)
    };
    const handlecheckout=()=>{
        const products=[]
        cartlist.forEach((item)=>{
            products.push({
                productId:item._id,
                quantity:item.howmuch
            })
        })
        const updatedOrderData = {
            ...orderdata,
            products: products,
            totalAmount: subtotal
        };
        setorderdata(updatedOrderData);
        navigate('/payment');

    }

    const styles = {
        page: {
            display: 'flex',
            padding: '20px',
            backgroundColor: '#eaeded',
            minHeight: '100vh',
            flexWrap: 'wrap',
            gap: '20px'
        },
        leftColumn: {
            flex: '0.8',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '4px'
        },
        rightColumn: {
            flex: '0.2',
            backgroundColor: 'white',
            padding: '20px',
            height: 'fit-content',
            borderRadius: '4px',
            minWidth: '250px'
        },
        title: {
            borderBottom: '1px solid #ddd',
            paddingBottom: '10px',
            marginBottom: '20px'
        },
        itemRow: {
            display: 'flex',
            padding: '15px 0',
            borderBottom: '1px solid #eee'
        },
        itemImg: {
            width: '150px',
            height: '150px',
            objectFit: 'contain'
        },
        itemInfo: {
            paddingLeft: '20px',
            flex: 1
        },
        price: {
            fontSize: '18px',
            fontWeight: 'bold'
        },
        removeBtn: {
            color: '#007185',
            cursor: 'pointer',
            fontSize: '13px',
            marginTop: '10px',
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
        },
        checkoutBtn: {
            width: '100%',
            backgroundColor: '#ffd814',
            border: '1px solid #fcd200',
            borderRadius: '8px',
            padding: '8px',
            cursor: 'pointer',
            marginTop: '15px',
            fontWeight: '500'
        }
    };

    return (
        <div style={styles.page}>
            {/* Left Section: Cart Items */}
            <div style={styles.leftColumn}>
                <h1 style={styles.title}>Shopping Cart</h1>
                {cartlist.length === 0 ? (
                    <p>Your Amazon Cart is empty. <span style={{color: '#007185', cursor: 'pointer'}} onClick={() => navigate('/')}>Continue Shopping</span></p>
                ) : (
                    cartlist.map((item) => (
                        <div key={item._id} style={styles.itemRow}>
                            <img src={item.images[0]} alt={item.fullName} style={styles.itemImg} />
                            <div style={styles.itemInfo}>
                                <h3 style={{fontSize: '18px', fontWeight: '500'}}>{item.name}</h3>
                                <p style={{color: '#007600', fontSize: '12px'}}>Quantity:{item.howmuch}</p>
                                
                                
                               
                            </div>
                            <div style={styles.price}>₹{item.price}</div>
                        </div>
                    ))
                )}
            </div>

            {/* Right Section: Subtotal Box */}
            <div style={styles.rightColumn}>
                <p style={{fontSize: '18px'}}>
                    Subtotal ({totalItems} items): <strong>₹{subtotal.toLocaleString()}</strong>
                </p>
                <div style={{marginTop: '5px', fontSize: '14px'}}>
                    <input type="checkbox" /> This order contains a gift
                </div>
                <button 
                    style={styles.checkoutBtn}
                    onClick={handlecheckout}
                >
                    Proceed to Buy
                </button>
            </div>
        </div>
    );
};

export default Checkout;