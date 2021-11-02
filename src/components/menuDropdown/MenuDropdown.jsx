import React from 'react';
import SignOut from '../signOut/SignOut';
import './MenuDropdown.css';

const MenuDropdown = ({ setModal }) => {
  return (
    <div className='menu-dropdown'>
      <div className='menu-items'>
        <ul>
          <li>
            <div className='menu-list'>New group</div>
          </li>
          <li>
            <div className='menu-list' onClick={() => setModal(true)}>
              New chat
            </div>
          </li>
          <li>
            <div className='menu-list'>
              <SignOut />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuDropdown;
