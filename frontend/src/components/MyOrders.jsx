import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ShoppingOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import userApi from '../axiosInstance2';
const MyOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
  console.log(orders)

    // Get the logged-in user's data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // 1. Fetch Orders (Sending userId in the BODY via POST)
    useEffect(() => {
        const fetchOrders = async () => {
            if (!user || !user.id) {
                setLoading(false);
                return;
            }

            try {
                // Using POST to send userId in the body
                const response = await userApi.post('/seeorders', {
                    userId: user.id 
                });
                const data = Array.isArray(response.data) ? response.data : (response.data.orders || []);
        setOrders(data);
        
                
         } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]); // Fallback to empty array on error to prevent crash
    } finally {
        setLoading(false);
    }
        };

        fetchOrders();
       
    }, [user?.id]);

    // 2. Handle Cancel Order (Sending orderId in the BODY via PUT)
    const handleCancelOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;

        try {
            const response = await userApi.post('/cancelorder', {
                orderId: orderId 
            });

            if (response.status === 200) {
                // Update the state locally to show "Cancelled" immediately
                setOrders(prevOrders => 
                    prevOrders.map(order => 
                        order._id === orderId ? { ...order, paymentStatus: 'Cancelled' } : order
                    )
                );
                alert("Order cancelled successfully.");
            }
        } catch (error) {
            console.error("Error cancelling order:", error);
            alert("Failed to cancel order. It might be already processed.");
        }
    };

    const styles = {
        container: { padding: '30px 10%', backgroundColor: '#eaeded', minHeight: '100vh' },
        header: { marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' },
        orderCard: { backgroundColor: 'white', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '20px', overflow: 'hidden' },
        cardHeader: { backgroundColor: '#f6f6f6', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ddd', fontSize: '12px', color: '#555' },
        cardBody: { padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
        productImg: { width: '70px', height: '70px', objectFit: 'contain', border: '1px solid #eee', padding: '5px' },
        statusBadge: (status) => ({
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
            backgroundColor: status === 'Cancelled' ? '#f8d7da' : (status === 'Completed' ? '#cfffd1' : '#fff3cd'),
            color: status === 'Cancelled' ? '#721c24' : (status === 'Completed' ? '#007600' : '#856404'),
        }),
        cancelBtn: { backgroundColor: 'white', color: '#B12704', border: '1px solid #B12704', borderRadius: '4px', padding: '7px 12px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px' }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '20px' }}>
                <LoadingOutlined style={{ marginRight: '10px' }} /> Loading your orders...
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={{ fontSize: '28px', fontWeight: '500' }}>Your Orders</h1>
                <h1 style={{ fontSize: '28px', fontWeight: '500' }} ><a href="/">Back to home</a></h1>
            </div>

            {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', backgroundColor: 'white', borderRadius: '8px' }}>
                    <ShoppingOutlined style={{ fontSize: '60px', color: '#ccc' }} />
                    <h3>No orders found.</h3>
                    <button 
                        style={{ marginTop: '15px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#ffd814', border: '1px solid #fcd200', borderRadius: '8px' }}
                        onClick={() => navigate('/')}
                    >
                        Go Shopping
                    </button>
                </div>
            ) : (
                orders.map((order) => (
                    <div key={order._id} style={styles.orderCard}>
                        {/* Amazon Header Bar */}
                        <div style={styles.cardHeader}>
                            <div style={{ flex: 1 }}>
                                <p>ORDER PLACED</p>
                                <p style={{ color: '#111', fontWeight: '700' }}>{new Date(order.createdAt).toDateString()}</p>
                            </div>
                            <div style={{ flex: 1 }}>
                                <p>TOTAL</p>
                                <p style={{ color: '#111', fontWeight: '700' }}>₹{order.totalAmount?.toLocaleString()}</p>
                            </div>
                            <div style={{ flex: 2 }}>
                                <p>SHIP TO</p>
                                <p style={{ color: '#007185', cursor: 'pointer', fontWeight: '700' }}>{user.fullName}</p>
                            </div>
                            <div style={{ textAlign: 'right', flex: 2 }}>
                                <p>ORDER # {order._id}</p>
                            </div>
                        </div>

                        {/* Order Content */}
                        <div style={styles.cardBody}>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                              {/**  <img src={order.products[0].productId.images[0]} alt="product placeholder" style={styles.productImg} />
                                 <img src={order.products[0].productId.images[1]} alt="product placeholder" style={styles.productImg} />*/}
                                <div>
                                    <h4 style={{ color: '#007185' }}>Order contains {order.products?.length} item(s)</h4>
                                    <p style={{ fontSize: '13px', color: '#555', marginTop: '5px' }}>Status Update: Payment {order.paymentStatus}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                                <div style={styles.statusBadge(order.paymentStatus)}>{order.paymentStatus}</div>
                                
                                {order.paymentStatus === 'Pending' && (
                                    <button 
                                        style={styles.cancelBtn} 
                                        onClick={() => handleCancelOrder(order._id)}
                                    >
                                        <CloseCircleOutlined /> Cancel Order
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyOrders;
