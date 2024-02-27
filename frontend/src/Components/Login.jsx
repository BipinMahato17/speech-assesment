import React from 'react'; 
import { useState } from 'react';
import'./Login.css';
import axios from 'axios';

import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';

const Login = () => {

    const [action, setAction] = useState("Sign Up");
    const[formData,setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        alert("we are into handling the form");
        // check if action is Sign Up and passwords match before submitting
        if(action === 'Sign Up' && formData.password != formData.confirmPassword){
            alert("passwords do not match");
            return;
        }

        axios.post('http://127.0.0.1:8000/register/', formData)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                {action==="Login"?<div></div>:<><div className='input'>
                    <img src={user_icon} alt="" />
                    <input 
                        type="text" 
                        name='firstName' 
                        placeholder="FirstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className='input'>
                    <img src={user_icon} alt="" />
                    <input 
                        type="text" 
                        name='lastName' 
                        placeholder="LastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                    </div>
                </>}
                
                <div className='input'>
                    <img src={email_icon} alt="" />
                    <input 
                        type="email" 
                        name='email' 
                        placeholder="Email Id"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='input'>
                    <img src={password_icon} alt="" />
                    <input 
                        type="password" 
                        name='password' 
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                {action==="Login"?<div></div>:<div className='input'>
                    <img src={password_icon} alt="" />
                    <input 
                        type="password" 
                        name='confirmPassword' 
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>}
            </div>
            
            <div className="forgot-password">Forgot Password? <span>Click here!</span></div>
            <div className='submit-container'>
                <div className={action==='Login'?"submit gray":"submit"} onClick={()=>{handleSubmit(); setAction('Sign Up')}}>Sign-up</div>
                <div className={action==='Sign Up'?"submit gray":"submit"} onClick={()=>{setAction('Login')}}>Login</div>
            </div>
        </div>
    );
};

export default Login;
