import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react'
import userApi from '../axiosInstance2';
import { SearchOutlined, ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons';
const Navbar = ({cartnumber}) => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Retrieve user data to show "Hello, [Name]"
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = async () => {
        const hide = message.loading("Logging out...", 0);
        
        try {
            // 1. Call the backend to clear the refreshTokenuser cookie
            // This works because userApi has withCredentials: true
            await userApi.post('/user/logout');

            // 2. Clear all user data from LocalStorage
            localStorage.removeItem('accessTokenuser');
            localStorage.removeItem('user');

            hide();
            message.success("Logged out successfully");

            // 3. Redirect to login or home page
            navigate('/login');
        } catch (error) {
            hide();
            console.error("Logout error:", error);
            
            // Even if the API fails (e.g., network error), 
            // we should still clear local data for security
            localStorage.clear(); 
            navigate('/login');
        }
    };
   const id='69bce1b1c867e8b63722183e'
    const handleProduct=async()=>{
        await userApi.post('/productpage',{id}).then((response)=>{
            console.log(response.data)
        }).catch((error)=>{
            console.error("Error fetching products:", error);
        })

    }
    const styles = {
        nav: {
            backgroundColor: '#131921',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'white',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            flexWrap: 'wrap' // Allows wrapping on small screens
        },
        logoSection: {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            marginRight: '20px'
        },
        logoImg: {
            width: '100px',
            marginTop: '10px'
        },
        searchContainer: {
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            borderRadius: '4px',
            overflow: 'hidden',
            margin: '0 20px',
            minWidth: '200px' // Ensures it doesn't disappear on mobile
        },
        searchInput: {
            height: '25px',
            padding: '10px',
            border: 'none',
            outline: 'none',
            width: '100%'
        },
        searchIcon: {
            padding: '10px',
            height: '25px',
            backgroundColor: '#febd69',
            color: '#131921',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '20px'
        },
        navItems: {
            display: 'flex',
            alignItems: 'center'
        },
        option: {
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '15px',
            marginRight: '15px',
            cursor: 'pointer'
        },
        optionLineOne: {
            fontSize: '12px',
            color: '#ccc'
        },
        optionLineTwo: {
            fontSize: '14px',
            fontWeight: '800'
        },
        basket: {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            position: 'relative'
        },
        basketCount: {
            marginLeft: '5px',
            marginRight: '10px',
            color: '#f08804'
        },
        modal: {
            position: 'absolute',
            top: '45px',
            right: '0',
            backgroundColor: 'white',
            color: 'black',
            width: '220px',
            padding: '15px',
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            display: showModal ? 'block' : 'none', // Toggle visibility
            textAlign: 'left',
            zIndex: 1001
        },
        modalArrow: {
            position: 'absolute',
            top: '-10px',
            right: '20px',
            width: '0',
            height: '0',
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: '10px solid white'
        },
        signOutBtn: {
            width: '100%',
            backgroundColor: '#ffd814',
            border: '1px solid #fcd200',
            borderRadius: '4px',
            padding: '5px',
            cursor: 'pointer',
            fontWeight: '500'
        }
    };

    return (
        <header style={styles.nav}>
            {/* Logo */}
            <div style={styles.logoSection} onClick={() => navigate('/')}>
                <img 
                    style={styles.logoImg}
                    src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
                    alt="amazon_logo" 
                />
            </div>

            {/* Search Bar */}
            <div style={styles.searchContainer}>
                <input style={styles.searchInput} type="text" placeholder="Search" />
                <div style={styles.searchIcon}>
                    <SearchOutlined />
                </div>
            </div>

            {/* Nav Links */}
            <div style={styles.navItems}>
                <div style={styles.option} onClick={() => !user && navigate('/login')}>
                    <span style={styles.optionLineOne}>Hello, {user ? user.fullName : 'Sign in'}</span>
                    <span style={styles.optionLineTwo}>Account & Lists</span>
                </div>

                <div style={styles.option} onClick={() => navigate('/orders')}>
                    <span style={styles.optionLineOne}>Returns</span>
                    <span style={styles.optionLineTwo}>& Orders</span>
                </div>

                <div style={styles.basket} onClick={() => navigate('/checkout')}>
                    <ShoppingCartOutlined style={{ fontSize: '30px' }} />
                    <span style={styles.optionLineTwo} className="basketCount">{cartnumber}</span>
                </div>
            </div>
           

           {/** <button onClick={handleProduct}>product</button>*/}

        </header>

    );
    
    
}


  export   default Navbar;