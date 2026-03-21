import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './Pages/Home'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Loginadmin from './adminPages/Loginadmin'
import Productsadmin from './adminPages/Productsadmin'
import AddProduct from './adminPages/AddProduct'
import Checkout from './components/Checkout'
import {useState} from 'react'
import Payment from './components/Payment'
import MyOrders from './components/MyOrders'
function App() {
   const [cartlist,setcartlist]=useState([]);
    const [cartnumber,setcartnumber]=useState(0);
    const user = JSON.parse(localStorage.getItem('user'));

const [orderdata, setorderdata] = useState({
    userId: user ? user.id : "", // Automatically links the order to Nitish
    products: [],
    totalAmount: 0,
    paymentStatus: "Pending",
    shippingAddress: ""
});


  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home cartlist={cartlist} setcartlist={setcartlist} cartnumber={cartnumber} setcartnumber={setcartnumber}/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/adminlogin' element={<Loginadmin/>}/>
        <Route path='/admindashboard' element={<Productsadmin/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
         <Route path='/productreg' element={<AddProduct/>}/>
          <Route path='/checkout' element={<Checkout cartnumber={cartnumber} setcartnumber={setcartnumber} cartlist={cartlist} setcartlist={setcartlist} orderdata={orderdata} setorderdata={setorderdata}/>}/>
          <Route path='/payment' element={<Payment orderdata={orderdata} setorderdata={setorderdata}/>}/>
        </Routes>
        </Router>
    </>
  )
}


export default App
