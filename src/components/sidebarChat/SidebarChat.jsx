import React from 'react';
import { Avatar } from '@material-ui/core';

import './SidebarChat.css';

const SidebarChat = ({ lastMessage, userInfo }) => {
  return (
    <div className='sidebarChat'>
      <Avatar src={userInfo.profilePicture} />
      <div className='sidebarChat-info'>
        <h2>{userInfo.username}</h2>
        <p>{lastMessage}</p>
      </div>
    </div>
  );
};

export default SidebarChat;
