import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import React, { useState, useEffect, useRef } from 'react';
import './ChatBox.css';

import { useSelector } from 'react-redux';

import axios from '../../axios';
import { format } from 'timeago.js';

const ChatBox = ({ currentChat }) => {
  const [input, setInput] = useState('');

  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState('');
  const { currentUser } = useSelector((state) => state.user);

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.patch('/api/v1/private/' + currentChat._id, {
        messages: [
          {
            sender: currentUser.uid,
            text: input,
            isRead: false,
            date: new Date().toISOString(),
          },
        ],
      });

      setInput('');
      console.log(res.data?.data);
      setMessages([...messages, input]);
    } catch (err) {
      console.error(err.message);
    }
  };

  const findUserName = (sender) => {
    return currentChat.userInfo.map((usr) => {
      if (usr.userid === sender) {
        return usr.username;
      }
    });
  };

  const findeAvatar = () => {
    return currentChat.userInfo.map((usr) => {
      if (usr.userid !== currentUser.uid) {
        return usr.profilePicture;
      }
    });
  };

  // console.log(currentChat);

  return (
    <div className='chat-box'>
      {currentChat ? (
        <>
          <div className='chat-box-header'>
            <Avatar src={`${findeAvatar()}`} />

            <div className='chat-box-header-info'>
              {/* <h3>{roomName}</h3>
                    <p>last seen {messages[messages.length - 1]._id ? date(messages[messages.length - 1]._id) : console.log(messages[messages.length - 1].timestamp)}</p> */}
            </div>

            <div className='chat-box-header-right'>
              <IconButton>
                <SearchIcon />
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </div>
          </div>

          <div className='chat-box-body'>
            {currentChat.messages.map((message) => (
              <div ref={scrollRef}>
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
            ))}
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

/* //   <p className={`chat-message ${message.received && 'chat-reciever'}`}>
        //     <span className='chat-name'>john</span>

        //     <span className='chat-timestamp'>9:00</span>
        //   </p>
          // <p className={ `chat-message ${ message.received && "chat-reciever"}` }>
          // <span className="chat-name">{message.name}</span>
          // {message.message}
          // <span className="chat-timestamp">{message._id ?date(message._id) : message.timestamp}</span>
          // </p>
          ))} */
