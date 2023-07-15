import React from 'react';
import camelphoto from '../images/camelphoto.jpg';

function Header() {
  return (
    <div>
      <img
        src={camelphoto}
        alt="logo"
        style={{ width: '40px', height: '40px' }}
      />
    </div>
  );
}

export default Header;
