import React, { useState, useEffect } from 'react';

import ChatBox from './../chatBox/ChatBox';
import Sidebar from '../sidebar/Sidebar';
import SignOut from '../signOut/SignOut';
import './Chat.css';

const Chat = () => {
  return (
    <div className='chat'>
      <SignOut />
      <div className='chat-body'>
        <Sidebar />
        <ChatBox />
      </div>
    </div>
  );
};

export default Chat;
