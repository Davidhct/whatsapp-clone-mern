import { Avatar, IconButton, makeStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';

import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import React, { useState, useEffect, useRef, createRef } from 'react';
import MenuDropdown from '../menuDropdown/MenuDropdown';

import Emoji from 'emoji-picker-react';
import './ChatBox.css';

import { useSelector } from 'react-redux';

import axios from '../../axios';
import { format } from 'timeago.js';
// import { io } from 'socket.io-client';

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
  clickMenu,
  setClickMenu,
  socket,
  setCurrentChat,
}) => {
  const classes = useStyles();
  // const socket = useRef();
  const [input, setInput] = useState('');

  const [messages, setMessages] = useState([]);
  const [gotMessage, setGotMessage] = useState(null);
  const [menuDrop, setMenuDrop] = useState(false);
  const [isGroupAdmin, setIsGroupAdmin] = useState(false);
  const [clickEmoji, setClickEmoji] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const { currentUser } = useSelector((state) => state.user);
  const inputRef = createRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.on('getMessage', (data) => {
      let conversation = {
        sender: data.sender,
        text: data.text,
        isRead: data.isRead,
        date: data.date,
      };
      const room = data.room;
      setGotMessage({ conversation, room });

      // if (currentChat?._id === data.room) {
      //   setMessages((prev) => [...prev, conversation]);
      // }
    });
  }, []);
  useEffect(() => {
    //client - side;

    if (currentChat && gotMessage) {
      if (currentChat?._id === gotMessage.room) {
        console.log('33333');
        setMessages((prev) => [...prev, gotMessage.conversation]);
      }
    }

    // socket.emit('join_room', currentChat?._id);
  }, [gotMessage, currentChat]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          '/api/v1/messages/?chatId=' + currentChat?._id
        );

        setMessages(res?.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    socket.emit('addChat', currentChat?._id);

    socket.on('getChats', (chats) => {
      console.log(chats);
    });
  }, [currentChat]);

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
  }, [currentChat, currentUser]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentChat]);

  const reconnectMember = async () => {
    try {
      let friendId = currentChat?.userInfo.find(
        (el) => el.userid !== currentUser.uid
      );

      await axios.patch('/api/v1/members/?chatId=' + currentChat?._id, {
        addPerson: [friendId.userid],
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const sendMessage = async (event) => {
    event.preventDefault();

    try {
      const messageObj = {
        sender: currentUser.uid,
        text: input,
        isRead: false,
        date: new Date().toISOString(),
      };

      const messageData = {
        senderId: currentUser.uid,
        text: input,
        date: new Date().toISOString(),
        room: currentChat?._id,
      };

      const lastMessage = {
        text: input,
        room: currentChat?._id,
      };
      socket.emit('sendMessage', messageData);
      socket.emit('lastMessage', lastMessage);

      const res = await axios.patch(
        '/api/v1/messages/?chatId=' + currentChat?._id,
        {
          messages: [messageObj],
        }
      );
      setMessages((prev) => [...prev, res.data?.data.messages]);
      setInput('');
      let lastMsg = res.data?.data.messages;
      console.log(lastMsg);

      if (!currentChat?.isGroup && currentChat?.members.length === 1) {
        reconnectMember();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const findUserName = (sender) => {
    let pName;
    currentChat.userInfo.forEach((usr) => {
      if (usr.userid === sender) {
        pName = usr.username;
      }
    });
    return pName;
  };
  const handleClickEmoji = () => {
    inputRef.current.focus();
    setClickEmoji(!clickEmoji);
  };
  const onEmojiClick = (event, { emoji }) => {
    const ref = inputRef.current;
    ref.focus();
    const start = input.substring(0, ref.selectionStart);
    const end = input.substring(ref.selectionStart);
    const text = start + emoji + end;
    setInput(text);
    setCursorPosition(start.length + emoji.length);
  };

  useEffect(() => {
    if (cursorPosition) inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition, inputRef]);

  const handleChangeInput = (event) => {
    setInput(event.target.value);
  };

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
              {clickMenu ? (
                <IconButton
                  className={clickMenu ? classes.moreVert : null}
                  onClick={() => setClickMenu(!clickMenu)}
                >
                  <CloseIcon />
                </IconButton>
              ) : (
                <IconButton
                  className={clickMenu ? classes.moreVert : null}
                  onClick={() => setClickMenu(!clickMenu)}
                >
                  <MenuIcon />
                </IconButton>
              )}
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

              {/* {clickMenu ?  : null} */}
            </div>
          </div>

          <div className='chat-box-body'>
            {messages.map((message, i) =>
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
              <div className={`chat-box-emoji ${!clickEmoji && 'hidden'}`}>
                <Emoji onEmojiClick={onEmojiClick} />
              </div>
              <IconButton onClick={handleClickEmoji}>
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
                onChange={handleChangeInput}
                ref={inputRef}
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
