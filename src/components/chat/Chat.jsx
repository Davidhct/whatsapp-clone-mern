import React, { useState } from 'react';

import ChatBox from './../chatBox/ChatBox';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';
import './Chat.css';

const Chat = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [userPic, setUserPic] = useState([]);
  const [userNam, setUserName] = useState([]);

  return (
    <div className='chat'>
      <Header />
      <div className='chat-body'>
        <Sidebar
          setCurrentChat={setCurrentChat}
          currentChat={currentChat}
          setUserPic={setUserPic}
          setUserName={setUserName}
        />
        <ChatBox
          currentChat={currentChat}
          userPic={userPic}
          userNam={userNam}
        />
      </div>
    </div>
  );
};

export default Chat;
