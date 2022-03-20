import React from 'react';
import { useSelector } from 'react-redux';
import SignOut from '../signOut/SignOut';

import './Header.css';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <nav className='header-wrapper'>
      <div className='header'>
        <div>Hello, {currentUser.displayName}</div>
        <div>
          <SignOut uppercase={true} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
