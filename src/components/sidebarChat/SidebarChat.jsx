import React from 'react';
import { Avatar } from '@material-ui/core';

import './SidebarChat.css';
// import { db } from '../../firebase.utils';
import { Link } from 'react-router-dom';

const SidebarChat = ({ id, name, addNewChat }) => {
  const createChat = () => {
    // const roomName = prompt("Please enter name for chat room ");
    // if (roomName) {
    //     db.collection('users').add({
    //         name:roomName,
    //     });
    // }
  };

  return !addNewChat ? (
    <Link to={`/users/${id}`}>
      <div className='sidebarChat'>
        <Avatar />
        <div className='sidebarChat-info'>
          <h2>{name}</h2>
          <p>The last message in the room</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className='sidebarChat' onClick={createChat}>
      <div className='sidebarChat-info'>
        <h2>Add new Chat</h2>
      </div>
    </div>
  );
};

export default SidebarChat;
