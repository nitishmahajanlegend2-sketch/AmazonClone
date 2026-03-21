import React from 'react'
import styled from 'styled-components'
import {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const Loginadmin=()=>{
const [name,setname]=useState('');
const [password,setpassword]=useState('')
const [dash,setdash]=useState(false);
const navigate = useNavigate();
const handlelogin = async (e) => {
  e.preventDefault();

  const loginData = {
    username: name, // Replace with your state variable
    password: password  // Replace with your state variable
  };

  try {
    // Axios handles JSON.stringify and Content-Type header automatically
    const response = await axios.post('http://localhost:8080/admin/login', loginData, { withCredentials: true });
      // This is the Axios equivalent of credentials: 'include);
setname('')
setpassword('')
    // In Axios, the server's response is always inside the 'data' property
    const { accessToken, userc } = response.data;

    console.log("Login Successful!", userc);
    
    // 1. Store the Access Token
    localStorage.setItem('accessToken', accessToken);
    
    // 2. Redirect (if using react-router-dom)
    navigate('/admindashboard'); 

  } catch (error) {
    // Axios automatically throws an error for 4xx and 5xx responses
    console.log(error)
    const errorMessage = error.response?.data?.message || "Invalid Credentials";
    console.error("Login Error:", error.response?.status, errorMessage);
    alert(errorMessage);
  }
}
    return(
        <Container>
            <Logo>
                <img src="./amazon-logo.jpg" alt="amazonlogo" />
            </Logo>
            <FormContainer>
                <h3>Admin Login</h3>
                <InputContainer>
            <p>Username</p>
            <input value={name} onChange={(e) => setname(e.target.value)} type="text" placeholder='John Doe' />
            </InputContainer>
            <InputContainer>
            <p>Password</p>
            <input value={password} onChange={(e) => setpassword(e.target.value)} type="password" placeholder='******' />
            </InputContainer>
            <LoginButton>
                <button style={{backgroundColor:'#f3b414', border:'none', width:'100%',height:'35px'}} onClick={handlelogin}>Login</button>
            </LoginButton>
                        <Infotext>
                By continuing,you agree to Amazon's 
                <span> Conditions of Use</span> and <span> Privacy 
                Notice.</span>
            </Infotext>
            </FormContainer>
            <SignUpButton>
                Create Account in Amazon
            </SignUpButton>
            
            
        </Container>


    )}

const Container=styled.div`
width:75%;
min-width:450px;
height:fit-content;
padding:15px;
margin:auto;
display:flex;
flex-direction:column;
align-items:center;

`;
const Logo=styled.div`
width:120px;
img{
width:100%
margin-bottom:20px;
height:50px;
backgroundColor:white
}

`;
const FormContainer=styled.form` 
border:1px solid lightgray;
width:35%;
height:400px;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
padding:15px;
h3{
font-size:28px;
font-weight:400;
line-height:33px;
align-self:flex-start;
margin-bottom:10px;
}

`
const InputContainer=styled.div`
width:100%;
padding:10px;
p{
font-size:14px;
font-weight:600;
}
input{
width:95%;
height:33px;
padding-left:5px;
border-radius:1 px solid lightgray;
&:hover{
border: 1px solid orange
background-color:blue
}
}
`
const LoginButton=styled.button`
width:70%;
height:35px;
background-color:#f3b414;
border:none;
outline:none;
border-radius:10px;
margin-top:30px;

`
const Infotext=styled.div`
font-size:15px;
width:100%;
word-wrap:normal;
word-break:normal;
margin-top:20px;
span{
color:#426bc0;
}

`
const SignUpButton=styled.button`
width:30%;
height:35px;
font-size:12px;
margin-top:20px;
&:hover{
background-color:#dfdfdf;
border:1px solid gray;
}
`
export default Loginadmin;