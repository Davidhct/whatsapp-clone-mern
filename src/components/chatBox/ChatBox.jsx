import { Avatar, IconButton, makeStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import React, { useState, useEffect, useRef } from 'react';
import MenuDropdown from '../menuDropdown/MenuDropdown';
import './ChatBox.css';

import { useSelector } from 'react-redux';

import axios from '../../axios';
import { format } from 'timeago.js';

const useStyles = makeStyles({
  moreVert: {
    backgroundColor: '#d4d4df',
  },
});

const ChatBox = ({
  currentChat,
  userPic,
  userNam,
  chatModal,
  setChatModal,
  setGroupModal,
  setAddPerson,
}) => {
  const classes = useStyles();
  const [input, setInput] = useState('');

  const [messages, setMessages] = useState([]);
  const [menuDrop, setMenuDrop] = useState(false);
  const [isGroupAdmin, setIsGroupAdmin] = useState(false);
  const [addPerson, setPerson] = useState(false);

  // const [deleteChat, setDeleteChat] = useState(false);
  // const [sender, setSender] = useState('');
  const { currentUser } = useSelector((state) => state.user);

  const scrollRef = useRef();

  useEffect(() => {
    if (currentChat?.isGroup) {
      currentChat?.admin.forEach((a) => {
        if (a === currentUser.uid) {
          setIsGroupAdmin(true);
        }
      });
    } else {
      setIsGroupAdmin(false);
    }
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentChat]);

  const reconnectMember = async () => {
    try {
      let friendId = currentChat?.userInfo.find(
        (el) => el.userid !== currentUser.uid
      );

      await axios.patch('/api/v1/conversations/?chatId=' + currentChat?._id, {
        reconnect: true,
        members: [friendId.userid],
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const sendMessage = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.patch(
        '/api/v1/conversations/' + currentChat?._id,
        {
          messages: [
            {
              sender: currentUser.uid,
              text: input,
              isRead: false,
              date: new Date().toISOString(),
            },
          ],
        }
      );
      setInput('');
      let lastMsg = res.data?.data.messages;
      console.log(lastMsg);

      setMessages([...messages, lastMsg]);
      if (!currentChat?.isGroup && currentChat?.members.length === 1) {
        reconnectMember();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const findUserName = (sender) => {
    return currentChat.userInfo.map((usr) => {
      if (usr.userid === sender) {
        return usr.username;
      }
      return;
    });
  };

  console.log(currentChat);

  return (
    <div className='chat-box'>
      {currentChat ? (
        <>
          <div className='chat-box-header'>
            <Avatar src={userPic} />

            <div
              className={`chat-box-header-info ${
                currentChat?.isGroup ? '' : 'single-person-info'
              }`}
            >
              <h3>{userNam}</h3>

              <div className={currentChat?.isGroup ? 'names-group' : 'hidden'}>
                {currentChat?.userInfo.map((m) => (
                  <p className='name-person'>{m.username},</p>
                ))}
              </div>
            </div>

            <div className='chat-box-header-right'>
              <IconButton>
                <SearchIcon />
              </IconButton>
              <IconButton
                className={menuDrop ? classes.moreVert : null}
                onClick={() => setMenuDrop(!menuDrop)}
              >
                <MoreVertIcon />
              </IconButton>
              <div
                className={
                  menuDrop
                    ? `menu-drop-cahtbox ${
                        !isGroupAdmin ? 'menu-drop-cahtbox-group' : ''
                      }`
                    : 'hidden'
                }
              >
                <MenuDropdown
                  isSidebar={false}
                  chatGroup={isGroupAdmin}
                  currentChat={currentChat}
                  setAddPerson={setAddPerson}
                  setGroupModal={setGroupModal}
                  setChatModal={setChatModal}
                  chatModal={chatModal}
                />
              </div>
            </div>
          </div>

          <div className='chat-box-body'>
            {currentChat.messages.map((message, i) =>
              message.sender ? (
                <div key={i} ref={scrollRef}>
                  <p
                    className={`chat-box-message 
                ${message.sender === currentUser.uid && 'chat-box-reciever'}`}
                  >
                    <span className='chat-box-name'>
                      {findUserName(message.sender)}
                    </span>

                    {message.text}

                    <span className='chat-box-timestamp'>
                      {format(message.date)}
                    </span>
                  </p>
                </div>
              ) : null
            )}
          </div>
          <div className='chat-box-footer'>
            <div className='chat-box-footer-left'>
              <IconButton>
                <InsertEmoticonIcon />
              </IconButton>
              <IconButton>
                <AttachFileIcon />
              </IconButton>
            </div>
            <form>
              <input
                type='text'
                placeholder='Type a message'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              {!input ? (
                <IconButton>
                  <MicIcon />
                </IconButton>
              ) : (
                <IconButton type='submit' onClick={sendMessage}>
                  <SendIcon />
                </IconButton>
              )}
            </form>
          </div>
        </>
      ) : (
        <span className='message-box'>
          Open a conversation to start a chat.
        </span>
      )}
    </div>
  );
};

export default ChatBox;
