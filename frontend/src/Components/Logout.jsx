// import React from 'react';
// import {useNavigate} from 'react-router-dom';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { clearSession } from './authUtils';

// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.withCredentials = true;


// const client = axios.create({
//   baseURL: "http://127.0.0.1:8000"
// });


// const Logout = () => {

//     const navigate = useNavigate();
    
//     const handleLogout = () => {
//     console.log("logout")
//     client.post(
//         "/logout/",
//         {withCredentials: true},{
//             headers:{
//                 'X-CSRFToken':Cookies.get('csrftoken'),
//             }
//         }
//       ).then(function(res) {
//         clearSession()
//         console.log("cleared")
//         navigate('/login');
//   }
// )};

//   return (

// <div>
// <h1>Are you sure want to logout ?</h1>

    
//     <button onClick={handleLogout}>Yes</button>
// <button>
//     <Link to "" >
    
//     </Link>

//     </button>

//     </div>
//   );
// };

// export default Logout;


import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
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
        console.log("logout");
        client.post(
            "/logout/",
            {},
            {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': Cookies.get('csrftoken'),
                }
            }
        ).then(function(res) {
            clearSession();
            console.log("cleared");
            navigate('/login');
        }).catch(function(error) {
            console.error("Logout error:", error);
        });
    };

    return (
        <div>
            <h1>Are you sure you want to logout?</h1>
            <button onClick={handleLogout}>Yes</button>
            {/* Link to "/home" */}
            <button>
                <Link to="/">No</Link>
            </button>
        </div>
    );
};

export default Logout;
