import React from 'react';
import { Link } from 'react-router-dom';

const LogoutButton = () => {
  return (
    <button className='Login'>
      <Link className='Logintext' to="/user/logout">Log out</Link>
    </button>
  );
};

export default LogoutButton;
