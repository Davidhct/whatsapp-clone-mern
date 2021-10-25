import React, { useState } from 'react';

import ChatBox from './../chatBox/ChatBox';
import Sidebar from '../sidebar/Sidebar';
import SignOut from '../signOut/SignOut';
import './Chat.css';

const Chat = () => {
  const [currentChat, setCurrentChat] = useState(null);

  return (
    <div className='chat'>
      <SignOut />
      <div className='chat-body'>
        <Sidebar setCurrentChat={setCurrentChat} currentChat={currentChat} />
        <ChatBox currentChat={currentChat} />
      </div>
    </div>
  );
};

export default Chat;
