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
  // const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const scrollRef = useRef();
  useEffect(() => {
    const getMessages = async () => {
      try {
        console.log(currentChat.members[1]);
        let friendId;
        if (currentChat.members[0] === currentUser.uid)
          friendId = currentChat.members[1];
        else if (currentChat.members[1] === currentUser.uid)
          friendId = currentChat.members[0];
        // const friendId = currentChat.members.find((m) => m !== currentUser.uid);

        const res = await axios.get('/api/v1/messages/' + friendId);
        let conve = [...res.data];

        let updateConve = conve.filter(
          (c) =>
            c.conversationId === currentUser.uid || c.sender === currentUser.uid
        );

        console.log(conve);
        console.log(updateConve);
        setMessages(updateConve);
        // console.log(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (event) => {
    event.preventDefault();
    // const newMessage = {
    //   sender: currentUser.uid,
    //   text: input,
    //   conversationId: currentChat.members[1],
    // };
    try {
      const res = await axios.post('/api/v1/messages', {
        conversationId: currentChat.members[0],
        sender: currentUser.uid,
        text: input,
      });

      setMessages([...messages, res.data]);
      setInput('');
      console.log(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  // console.log(messages);

  return (
    <div className='chat-box'>
      {currentChat ? (
        <>
          <div className='chat-box-header'>
            <Avatar />

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
            {messages.map((message) => (
              <div ref={scrollRef}>
                <p
                  className={`chat-box-message 
                ${message.sender === currentUser.uid && 'chat-box-reciever'}`}
                >
                  <span className='chat-box-name'>tmp</span>
                  {message.text}
                  <span className='chat-box-timestamp'>
                    {format(message.updatedAt)}
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
