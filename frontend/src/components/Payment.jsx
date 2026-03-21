import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {message} from 'antd'
import userApi from '../axiosInstance2';
const Payment = ({ orderdata, setorderdata }) => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('cod'); // Default to COD

    const handleAddressChange = (e) => {
        setorderdata({ ...orderdata, shippingAddress: e.target.value });
    };

    // --- MAIN LOGIC FUNCTION ---
    const processOrder = async () => {
        if (!orderdata.shippingAddress) {
            message.error("Please enter a shipping address!");
            return;
        }

        if (paymentMethod === 'paynow') {
            await handleOnlinePayment();
        } else {
            await handleCOD();
        }
    };
const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
    // 1. Function for Online Payment (Razorpay Placeholder)
    const handleOnlinePayment = async () => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const amount=orderdata.totalAmount;
    console.log("this is order data",orderdata.totalAmount)

    // 1. Create order on your Express backend
    const order = await userApi.post("/doonlinepayment",{amount});

    //const order = await result.json();
console.log(order)
    if (!order) {
      alert("Server error. Are you sure the backend is running?");
      return;
    }

    // 2. Initialize Razorpay Checkout
    const options = {
      key: "rzp_test_SSHejQAeE0aGXH", // Enter your Key ID here
      amount: order.data.amount,
      currency: order.data.currency,
      name: "Nitish Mahajan Corp",
      
      
      order_id: order.data.id,
      handler: async function (response) {
        // This is where you'd typically call a verification API on your backend
        const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.id) {
        alert("Please login to place an order.");
        navigate('/login');
        return;
    }
        try {
            const finalOrder = { 
                ...orderdata, 
                paymentStatus: 'Completed',
                userId: user.id // Link the order to the logged-in user
            };
            const response = await userApi.post('/createorder', finalOrder);
            
            if (response.status === 201) {
                message.success("Order Placed Successfully!");
                navigate('/myorders');
            }
        } catch (error) {
            alert("Error placing  order.");
        }
        message.success(`Payment Success! ID: ${response.razorpay_payment_id}`);

      },
      prefill: {
        name: "Nitish",
        email: "nitish@example.com",
        contact: "9999999999",
      },
      theme: { color: "#61dafb" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

  };

    
    

    // 2. Function for Cash on Delivery (Direct API)
    const handleCOD = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.id) {
        alert("Please login to place an order.");
        navigate('/login');
        return;
    }
        try {
            const finalOrder = { 
                ...orderdata, 
                paymentStatus: 'Pending',
                userId: user.id // Link the order to the logged-in user
            };
            const response = await userApi.post('/createorder', finalOrder);
            
            if (response.status === 201) {
                message.success("Order Placed Successfully via COD!");
                navigate('/myorders');
            }
        } catch (error) {
            alert("Error placing COD order.");
        }
    };

    const styles = {
        container: { display: 'flex', padding: '20px', backgroundColor: '#eaeded', minHeight: '100vh', gap: '20px', flexWrap: 'wrap' },
        mainSection: { flex: '0.7', display: 'flex', flexDirection: 'column', gap: '15px' },
        sectionBox: { backgroundColor: 'white', padding: '20px', borderRadius: '4px', border: '1px solid #ddd' },
        sidebar: { flex: '0.3', backgroundColor: 'white', padding: '20px', height: 'fit-content', borderRadius: '4px', border: '1px solid #ddd', minWidth: '280px' },
        input: { width: '100%', padding: '10px', marginTop: '10px', borderRadius: '4px', border: '1px solid #a6a6a6' },
        paymentOption: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', cursor: 'pointer', padding: '10px', border: '1px solid #eee', borderRadius: '4px' },
        activeOption: { borderColor: '#e77600', backgroundColor: '#fcf5ee' },
        orderBtn: { width: '100%', backgroundColor: '#ffd814', border: '1px solid #fcd200', borderRadius: '8px', padding: '10px', cursor: 'pointer', fontWeight: 'bold', marginTop: '15px' }
    };

    return (
        <div style={styles.container}>
            <div style={styles.mainSection}>
                {/* 1. Address Section */}
                <div style={styles.sectionBox}>
                    <h3 style={{ fontSize: '18px' }}>1. Shipping address</h3>
                    <textarea 
                        style={styles.input} 
                        placeholder="Enter full address..."
                        value={orderdata.shippingAddress || ""}
                        onChange={handleAddressChange}
                    />
                </div>

                {/* 2. Payment Selection Section */}
                <div style={styles.sectionBox}>
                    <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>2. Select Payment Method</h3>
                    
                    {/* COD Option */}
                    <div 
                        style={{ ...styles.paymentOption, ...(paymentMethod === 'cod' ? styles.activeOption : {}) }}
                        onClick={() => setPaymentMethod('cod')}
                    >
                        <input type="radio" checked={paymentMethod === 'cod'} readOnly />
                        <div>
                            <strong>Cash on Delivery (COD)</strong>
                            <div style={{ fontSize: '12px', color: '#555' }}>Pay at your doorstep</div>
                        </div>
                    </div>

                    {/* PayNow Option */}
                    <div 
                        style={{ ...styles.paymentOption, ...(paymentMethod === 'paynow' ? styles.activeOption : {}) }}
                        onClick={() => setPaymentMethod('paynow')}
                    >
                        <input type="radio" checked={paymentMethod === 'paynow'} readOnly />
                        <div>
                            <strong>PayNow (Online Payment)</strong>
                            <div style={{ fontSize: '12px', color: '#555' }}>Cards, UPI, Netbanking (Razorpay)</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar Summary */}
            <div style={styles.sidebar}>
                <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Order Summary</h3>
                <div style={{ borderTop: '1px solid #eee', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', color: '#B12704', fontWeight: 'bold', fontSize: '18px' }}>
                    <span>Order Total:</span>
                    <span>₹{orderdata.totalAmount?.toLocaleString()}</span>
                </div>

                <button style={styles.orderBtn} onClick={processOrder}>
                    {paymentMethod === 'paynow' ? 'Proceed to Pay' : 'Place COD Order'}
                </button>
            </div>
        </div>
    );
};

export default Payment;
