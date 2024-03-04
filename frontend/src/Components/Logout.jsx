import React from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { clearSession } from './authUtils';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});


const Logout = () => {

    const navigate = useNavigate();
    
    const handleLogout = () => {
    console.log("logout")
    client.post(
        "/logout/",
        {withCredentials: true},{
            headers:{
                'X-CSRFToken':Cookies.get('csrftoken'),
            }
        }
      ).then(function(res) {
        clearSession()
        console.log("cleared")
        navigate('/login');
  }
)};

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
