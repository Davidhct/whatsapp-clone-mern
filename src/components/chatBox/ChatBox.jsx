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
  const [currentMessages, setCurrentMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const scrollRef = useRef();
  // useEffect(() => {
  //   const getMessages = async () => {
  //     try {
  //       console.log(currentChat.members[1]);
  //       // let friendId;
  //       // if (currentChat.members[0] === currentUser.uid)
  //       //   friendId = currentChat.members[1];
  //       // else if (currentChat.members[1] === currentUser.uid)
  //       //   friendId = currentChat.members[0];
  //       // const friendId = currentChat.members.find((m) => m !== currentUser.uid);

  //       const res = await axios.patch('/api/v1/private/' + friendId);
  //       let conve = [...res.data];

  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   };
  //   getMessages();
  // }, [currentChat]);

  useEffect(() => {
    console.log(currentChat.members);
    setCurrentMessages([...currentChat.messages]);
    setMembers([...currentChat.members]);
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
      setMessages([...currentMessages, input]);
      const res = await axios.patch('/api/v1/private', {
        members: members,
        messages: [input],
      });

      setInput('');
      console.log(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  console.log(currentChat);

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
            {currentMessages.map((message) => (
              <div ref={scrollRef}>
                <p
                  className={`chat-box-message 
                ${
                  (members[0] === currentUser.uid ||
                    members[1] === currentUser.uid) &&
                  'chat-box-reciever'
                }`}
                >
                  <span className='chat-box-name'>tmp</span>
                  {message}
                  <span className='chat-box-timestamp'>
                    {format(currentChat.updatedAt)}
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
