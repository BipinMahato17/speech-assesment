import React from 'react'; 
import { useState } from 'react';

import'./Login.css';
import axios from 'axios';

import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';

const Login = () => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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
        // alert("we are into handling the form");
        // check if action is Sign Up and passwords match before submitting
        if(action === 'Sign Up' && formData.password != formData.confirmPassword){
            alert("passwords do not match");
            return;
        }

        axios.post('http://127.0.0.1:8000/register/', formData)
        .then(response => {
            console.log(response.data);
            setShowSuccessMessage(true);
            setAction('Login');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleLogin = () => {
        // alert("we are into login form");
        // Assuming 'email' and 'password' are variables containing the user's input
        const { email, password } = formData; // Destructure email and password from formData
        const loginData = {
            email: email,
            password: password
        };

        axios.post('http://127.0.0.1:8000/login/', loginData)
        .then(response => {
            console.log(response.data);
            // Redirect to the next page
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const handleToggle = () => {
        setAction(action === "Sign Up" ? "Login" : "Sign Up");
    };

    return (
        
        <div className='container'>
            
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            
            <div className='inputs'>
                {showSuccessMessage && (
                <div className="success-message">Signed Up Successfully!</div>
                )}
                {action==="Login"?<div></div>:<><div className='names'>
                    {/* <img src={user_icon} alt="" /> */}
                   
                        <input 
                            type="text" 
                            name='firstName' 
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />

                        <input 
                            type="text" 
                            name='lastName' 
                            placeholder="Last Name"
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

            {action === "Sign Up" ? 
                <div className='already-account'>Already have an account? <span onClick={handleToggle}>Click Here!</span></div> :
                (action === "Login" && <div className="forgot-password">Forgot Password? <span>Click here!</span></div>)
            }


            <div className='submit-container'>
                <div className={action==='Login'?"submit gray":"submit"} onClick={()=>{handleSubmit(); setAction('Sign Up')}}>Sign-up</div>
                <div className={action==='Sign Up'?"submit gray":"submit"} onClick={()=>{handleLogin(); setAction('Login')}}>Login</div>
            </div>
        </div>
    );
};

export default Login;
