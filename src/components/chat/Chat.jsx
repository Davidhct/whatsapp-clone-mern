import React, { useState } from 'react';

import ChatBox from './../chatBox/ChatBox';
import Sidebar from '../sidebar/Sidebar';
import SignOut from '../signOut/SignOut';
import './Chat.css';

const Chat = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [userPic, setUserPic] = useState([]);

  return (
    <div className='chat'>
      <SignOut />
      <div className='chat-body'>
        <Sidebar
          setCurrentChat={setCurrentChat}
          currentChat={currentChat}
          setUserPic={setUserPic}
        />
        <ChatBox currentChat={currentChat} userPic={userPic} />
      </div>
    </div>
  );
};

export default Chat;
