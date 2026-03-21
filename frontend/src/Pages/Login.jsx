/**import React from 'react'
import styled from 'styled-components'
import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {message} from 'antd'
function Login(){
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('')
    const navigate=useNavigate();
    



    return(
        <Container>
            <Logo>
                <img src="./amazon-logo.jpg" alt="amazonlogo" />
            </Logo>
            <FormContainer>
                <h3>Sign-In</h3>
                <InputContainer>
            <p>Email</p>
            <input value={email} onChange={(e)=>setemail(e.target.value)} type="email" placeholder='exampleexample.com' />
            </InputContainer>
            <InputContainer>
            <p>Password</p>
            <input  value={password} onChange={(e)=>setpassword(e.target.value)} type="password" placeholder='******' />
            </InputContainer>
            <LoginButton>
                Login
            </LoginButton>
            <Infotext>
                By continuing,you agree to Amazon's 
                <span> Conditions of Use</span> and <span> Privacy 
                Notice.</span>
            </Infotext>
            </FormContainer>
            <SignUpButton onClick={() => navigate('/signup')}> 
                Create Account in Amazon
            </SignUpButton>
            
            
        </Container>


    )
}*/
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
//import userApi from '../utils/userApi'; // Import your custom Axios instance
import axios from 'axios'
function Login() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [loading, setLoading] = useState(false); // Add a loading state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Stop page refresh
        
        // Basic validation
        if (!email || !password) {
            return message.error("Please enter both email and password");
        }

        setLoading(true);
        const hideLoading = message.loading("Verifying credentials...", 0);

        try {
            const response = await axios.post('http://localhost:8080/user/login', { email, password },{withCredentials:true});

            if (response.status === 200) {
                // 1. Save the access token specifically for the user role
                localStorage.setItem('accessTokenuser', response.data.accessTokenuser);
                console.log(response.data.user)
                const userData = {
            id: response.data.user.id,
            fullName: response.data.user.fullName,
            email: response.data.user.email
        };
        localStorage.setItem('user', JSON.stringify(userData));
                
                // 2. Clear loading and show success
                hideLoading();
                message.success("Logged in successfully!");
                
                // 3. Navigate to home page
                navigate('/');
            }
        } catch (error) {
            hideLoading();
            const errorMsg = error.response?.data?.message || "Login failed. Please try again.";
            message.error(errorMsg);
            console.error("Login Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Logo onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <img src="./amazon-logo.jpg" alt="amazonlogo" />
            </Logo>
            {/* Wrap inputs in the form and add onSubmit */}
            <FormContainer onSubmit={handleLogin}>
                <h3>Sign-In</h3>
                <InputContainer>
                    <p>Email</p>
                    <input 
                        value={email} 
                        onChange={(e) => setemail(e.target.value)} 
                        type="email" 
                        placeholder='example@example.com' 
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <p>Password</p>
                    <input 
                        value={password} 
                        onChange={(e) => setpassword(e.target.value)} 
                        type="password" 
                        placeholder='******' 
                        required
                    />
                </InputContainer>
                
                {/* Use the loading state to disable the button */}
                <LoginButton type="submit" disabled={loading}>
                    {loading ? "Processing..." : "Login"}
                </LoginButton>

                <Infotext>
                    By continuing, you agree to Amazon's 
                    <span> Conditions of Use</span> and <span> Privacy Notice.</span>
                </Infotext>
            </FormContainer>
            
            <SignUpButton onClick={() => navigate('/signup')}> 
                Create Your Amazon Account
            </SignUpButton>
        </Container>
    );
}
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
export default Login;