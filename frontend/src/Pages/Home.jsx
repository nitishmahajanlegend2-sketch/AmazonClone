import api from "../axiosInstance";
import userApi from "../axiosInstance2";
import Navbar from "../components/Navbar";
import InfiniteSlider from "../components/InfiniteSlider";
import AmazonHeroSlider from "../components/AmazonHeroSlider";
import axios from "axios";
import {useState} from 'react'
import Cards from '../components/Cards'
import {useEffect} from 'react'
import Footer from '../components/Footer'
const Home=({cartlist,setcartlist,cartnumber,setcartnumber})=>{
    const [products,setproducts]=useState([]);
   
   
    
    const getorders=async()=>{
        const res=api.post('/seeorders',{},{withCredentials:true})

    }
    
    useEffect(()=>{
        const getallproducts=async()=>{
        const res=await axios.get('https://amazonclone-20qm.onrender.com/nshopping/getproducts')
        console.log(res)
        console.log("This is the reoducts",res.data)
        setproducts(res.data)
    }
    getallproducts()
        
       
    },[])
    return(
        <>
        <Navbar cartnumber={cartnumber} />
     {/**  <h1 className="text-3xl">Home Page</h1>
       <button onClick={getallproducts}>get all products</button>*/}
       <Cards cartlist={cartlist} setcartlist={setcartlist} products={products} cartnumber={cartnumber} setcartnumber={setcartnumber} />
       <Footer/>

       </>
      
       
    )

}
export default Home;
