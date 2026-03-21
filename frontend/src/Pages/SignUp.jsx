/**import React from 'react';
import styled from 'styled-components'
function SignUp(){
    return(
        <Container>
             <Logo>
                <img src="./amazon-logo.jpg" alt="amazonlogo" />
            </Logo>
            <FormContainer>
                <h3>Sign-Up</h3>
                 <InputContainer>
            <p>FullName</p>
            <input type="text" placeholder='John Smith' required />
            </InputContainer>
                <InputContainer>
            <p>Email</p>
            <input type="email" placeholder='example@example.com' required />
            </InputContainer>
            <InputContainer>
            <p>Password</p>
            <input type="password" placeholder='******' required />
            </InputContainer>
            <SignUpButton >Create Account in Amazon</SignUpButton>
           
            </FormContainer>
            <LoginButton>Back to Login</LoginButton>
 

        </Container>

    )
}*/
import React, { useState } from 'react'; // 1. Import useState
import styled from 'styled-components';
import axios from 'axios'; // 2. Import your userApi
import { useNavigate } from 'react-router-dom';
import {message} from 'antd'
function SignUp() {
    // 3. Define state for each input
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // 4. Create the submit handler
    const handleSignUp = async (e) => {
        e.preventDefault(); // Prevents page reload
        
        try {
            const response = await axios.post('https://amazonclone-20qm.onrender.com/user/register', {
                fullName,
                email,
                password
            });

            if (response.status === 201) {
                message.success("Account Created Successfully!");
                navigate('/login'); // Redirect to login page
            }
        } catch (error) {
            console.error("Signup Error:", error.response?.data?.message || error.message);
            message.error(error.response?.data?.message || "Registration failed");
           
        }
    };

    return (
        <Container>
            <Logo>
                <img src="./amazon-logo.jpg" alt="amazonlogo" />
            </Logo>
            {/* 5. Add onSubmit to the FormContainer */}
            <FormContainer onSubmit={handleSignUp}>
                <h3>Sign-Up</h3>
                <InputContainer>
                    <p>FullName</p>
                    <input 
                        type="text" 
                        placeholder='John Smith' 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required 
                    />
                </InputContainer>
                <InputContainer>
                    <p>Email</p>
                    <input 
                        type="email" 
                        placeholder='example@example.com' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </InputContainer>
                <InputContainer>
                    <p>Password</p>
                    <input 
                        type="password" 
                        placeholder='******' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </InputContainer>
                {/* Change button type to submit */}
                <SignUpButton type="submit">Create Account in Amazon</SignUpButton>
            </FormContainer>
            <LoginButton onClick={() => navigate('/login')}>Back to Login</LoginButton>
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
margin-bottom:10px;
height:40px;
backgroundColor:white
}

`;
const FormContainer=styled.form` 
border:1px solid lightgray;
width:35%;
height:410px;
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
border: 1px solid orange;

}
}
`;
const SignUpButton=styled.button`
width:100%;
height:90px;
font-size:12px;
margin-top:20px;
&:hover{
background-color:#dfdfdf;
border:1px solid gray;
}`
const LoginButton=styled.button`
width:38%;
height:35px;
background-color:#f3b414;
border:none;
outline:none;
border-radius:10px;
margin-top:30px;

`
export default SignUp;
