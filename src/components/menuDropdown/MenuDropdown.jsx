import React from 'react';
import SignOut from '../signOut/SignOut';
import './MenuDropdown.css';

const MenuDropdown = ({ setModal, isGroup }) => {
  return (
    <div className='menu-dropdown'>
      {setModal ? (
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
      ) : (
        <div className='menu-items'>
          <ul>
            <li className={isGroup ? '' : 'hidden'}>
              <div className='menu-list'>Add person</div>
            </li>
            <li>
              <div className='menu-list'>Delete chat</div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
