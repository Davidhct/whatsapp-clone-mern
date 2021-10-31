import React, { useState, useEffect } from 'react';
import { Avatar } from '@material-ui/core';

import './SidebarChat.css';
// import { db } from '../../firebase.utils';
// import { Link } from 'react-router-dom';
import axios from './../../axios';

const SidebarChat = ({
  currentUser,
  conversation,
  addNewChat,
  currentChat,
  lastMessage,
}) => {
  const createChat = () => {
    // const roomName = prompt("Please enter name for chat room ");
    // if (roomName) {
    //     db.collection('users').add({
    //         name:roomName,
    //     });
    // }
  };
  const [user, setUser] = useState(null);

  useEffect(() => {
    // console.log(conversation.members.find((mbr) => mbr !== currentUser.uid));
    const friendId = conversation.members.find(
      (mbr) => mbr !== currentUser.uid
    );

    const getUser = async () => {
      try {
        const res = await axios.get('/api/v1/users/?userId=' + friendId);
        // console.log(res.data);

        setUser(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    getUser();

    // console.log(conversation);
  }, [conversation, currentUser]);

  return !addNewChat ? (
    <div className='sidebarChat'>
      <Avatar src={user?.profilePicture} />
      <div className='sidebarChat-info'>
        <h2>{user?.username}</h2>
        <p>{lastMessage}</p>
      </div>
    </div>
  ) : (
    <div className='sidebarChat' onClick={createChat}>
      <div className='sidebarChat-info'>
        <h2>Add new Chat</h2>
      </div>
    </div>
  );
};

export default SidebarChat;
