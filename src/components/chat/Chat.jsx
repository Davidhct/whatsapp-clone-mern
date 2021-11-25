import React, { useState } from 'react';

import ChatBox from './../chatBox/ChatBox';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';
import MegaMenu from '../megaMenu/MegaMenu';

import BackModal from '../backModal/BackModal';

import './Chat.css';

const Chat = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [userPic, setUserPic] = useState([]);
  const [userNam, setUserName] = useState([]);
  const [addPerson, setAddPerson] = useState(null);
  const [chatModal, setChatModal] = useState(null);
  const [groupModal, setGroupModal] = useState(null);
  const [clickMenu, setClickMenu] = useState(false);

  return (
    <div className='chat'>
      <Header />

      <div className='chat-body'>
        <div className='chat-body-left'>
          <MegaMenu clickMenu={clickMenu} setClickMenu={setClickMenu} />
          <Sidebar
            setCurrentChat={setCurrentChat}
            setUserPic={setUserPic}
            setUserName={setUserName}
            setChatModal={setChatModal}
            chatModal={chatModal}
            setGroupModal={setGroupModal}
            groupModal={groupModal}
          />
        </div>
        <ChatBox
          currentChat={currentChat}
          userPic={userPic}
          userNam={userNam}
          setChatModal={setChatModal}
          chatModal={chatModal}
          setGroupModal={setGroupModal}
          setAddPerson={setAddPerson}
          setClickMenu={setClickMenu}
          clickMenu={clickMenu}
        />
        <div className={chatModal || groupModal ? 'new-message' : 'hidden'}>
          <div className='chat-body-modal'>
            <BackModal
              currentChat={currentChat}
              setChatModal={setChatModal}
              chatModal={chatModal}
              addPerson={addPerson}
              setAddPerson={setAddPerson}
              groupModal={groupModal}
              setGroupModal={setGroupModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
