import React, { useState } from 'react';

import ChatBox from './../chatBox/ChatBox';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';
import GroupModal from '../groupModal/GroupModal';
import ChatModal from '../chatModal/ChatModal';
import './Chat.css';

const Chat = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [userPic, setUserPic] = useState([]);
  const [userNam, setUserName] = useState([]);

  const [chatModal, setChatModal] = useState(null);
  const [groupModal, setGroupModal] = useState(null);

  return (
    <div className='chat'>
      <Header />

      <div className='chat-body'>
        <Sidebar
          setCurrentChat={setCurrentChat}
          setUserPic={setUserPic}
          setUserName={setUserName}
          setChatModal={setChatModal}
          chatModal={chatModal}
          setGroupModal={setGroupModal}
          groupModal={groupModal}
        />
        <ChatBox
          currentChat={currentChat}
          userPic={userPic}
          userNam={userNam}
          setChatModal={setChatModal}
          chatModal={chatModal}
          setGroupModal={setGroupModal}
        />
        <div className={chatModal || groupModal ? 'new-message' : 'hidden'}>
          <div className='chat-body-modal'>
            {chatModal ? (
              <ChatModal setChatModal={setChatModal} chatModal={chatModal} />
            ) : (
              <GroupModal
                setGroupModal={setGroupModal}
                groupModal={groupModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
