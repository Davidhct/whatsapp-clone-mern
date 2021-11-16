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

  const [modalInput, setModalInput] = useState('');

  const [groupName, setGroupName] = useState('');
  const [groupList, setGroupList] = useState([]);
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
          //////////
          setGroupName={setGroupName}
          groupName={groupName}
          groupList={groupList}
          setGroupList={setGroupList}
          setModalInput={setModalInput}
        />
        <ChatBox
          currentChat={currentChat}
          userPic={userPic}
          userNam={userNam}
          setChatModal={setChatModal}
          chatModal={chatModal}
          setGroupModal={setGroupModal}
          setGroupName={setGroupName}
          groupName={groupName}
          setGroupList={setGroupList}
          groupList={groupList}
          setModalInput={setModalInput}
        />
        <div className={chatModal || groupModal ? 'new-message' : 'hidden'}>
          <div className='chat-body-modal'>
            {chatModal ? (
              <ChatModal
                setChatModal={setChatModal}
                chatModal={chatModal}
                setModalInput={setModalInput}
              />
            ) : (
              <GroupModal
                setGroupName={setGroupName}
                groupName={groupName}
                setGroupList={setGroupList}
                groupList={groupList}
                setGroupModal={setGroupModal}
                groupModal={groupModal}
                setModalInput={setModalInput}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
