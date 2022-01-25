import React from 'react';
import { Avatar } from '@material-ui/core';

import './SidebarChat.css';

const SidebarChat = ({ lastMessage, userInfo }) => {
  console.log(userInfo);
  return (
    <div className='sidebarChat'>
      <Avatar src={userInfo.profilePicture} />
      <div className='sidebarChat-info'>
        <div
          className={`sidebarChat-inner-info  ${
            lastMessage ? '' : 'empty-last-message'
          }`}
        >
          <div className='title-name'>
            <h2>{userInfo.username}</h2>
          </div>
          <div className='last-message'>
            <p>{lastMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarChat;
