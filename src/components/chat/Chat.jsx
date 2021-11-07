import React, { useState } from 'react';

import ChatBox from './../chatBox/ChatBox';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';
import NewMessageModal from '../newMessageModal/NewMessageModal';
import './Chat.css';

const Chat = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [userPic, setUserPic] = useState([]);
  const [userNam, setUserName] = useState([]);
  const [showModal, setModal] = useState(null);

  return (
    <div className='chat'>
      <Header />

      <div className='chat-body'>
        <div className={showModal ? 'new-message' : 'hidden'}>
          <div className='chat-body-modal'>
            <NewMessageModal
              typeInput={'email'}
              message={'Search and add a friend'}
              setModal={setModal}
              showModal={showModal}
            />
          </div>
        </div>
        <Sidebar
          setCurrentChat={setCurrentChat}
          currentChat={currentChat}
          setUserPic={setUserPic}
          setUserName={setUserName}
          userNam={userNam}
          userPic={userPic}
          setModal={setModal}
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
