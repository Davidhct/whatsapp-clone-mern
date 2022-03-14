import React, { useState, useEffect, useRef } from 'react';

import ChatBox from './../chatBox/ChatBox';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';
import MegaMenu from '../megaMenu/MegaMenu';

import BackModal from '../backModal/BackModal';
import { io } from 'socket.io-client';
import './Chat.css';

const Chat = () => {
  // socket state
  const socket = useRef();
  const [currentChat, setCurrentChat] = useState(null);
  const [userPic, setUserPic] = useState(null);
  const [userNam, setUserName] = useState([]);
  const [addPerson, setAddPerson] = useState(null);
  const [chatModal, setChatModal] = useState(null);
  const [groupModal, setGroupModal] = useState(null);
  const [clickMenu, setClickMenu] = useState(false);

  useEffect(() => {
    socket.current = io('ws://localhost:8900');
  }, []);

  console.log(currentChat);

  return (
    <div className='chat'>
      <Header />

      <div className='chat-body'>
        <div className='chat-body-left'>
          <MegaMenu
            clickMenu={clickMenu}
            setClickMenu={setClickMenu}
            currentChat={currentChat}
            setChatModal={setChatModal}
            setGroupModal={setGroupModal}
            setAddPerson={setAddPerson}
          />

          <Sidebar
            setCurrentChat={setCurrentChat}
            setUserPic={setUserPic}
            setUserName={setUserName}
            setChatModal={setChatModal}
            setGroupModal={setGroupModal}
          />
        </div>
        <ChatBox
          socket={socket}
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
