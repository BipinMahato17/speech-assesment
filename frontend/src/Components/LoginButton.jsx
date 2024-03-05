import React from 'react';
import { Link } from 'react-router-dom';

const LoginButton = () => {
  return (
    <button className='Login'>
      <Link className='Logintext' to="/login">Log in</Link>
    </button>
  );
};

export default LoginButton;
