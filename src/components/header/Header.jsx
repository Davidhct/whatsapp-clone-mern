import React from 'react';
import { useSelector } from 'react-redux';
import SignOut from '../signOut/SignOut';

import './Header.css';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='header-wrapper'>
      <div className='header'>
        <div>
          Hello, {currentUser.displayName}, id= {currentUser.uid}
        </div>
        <div>
          <SignOut uppercase={true} />
        </div>
      </div>
    </div>
  );
};

export default Header;
