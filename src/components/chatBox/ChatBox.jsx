import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import React, { useState, useEffect } from 'react';
import './ChatBox.css';
import { useParams } from 'react-router-dom';
// import { db } from '../../firebase.utils';
// import axios from '../../axios';

const ChatBox = ({ messages, userName }) => {
  const [input, setInput] = useState('');
  // const { roomId } = useParams();
  // const [roomName, setRoomName] = useState("");

  // const [setMessages]

  // useEffect(() => {
  //     if (roomId) {
  //         db.collection("rooms").doc(roomId).onSnapshot(snapshot => setRoomName(snapshot.data().name));

  //         // db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot((snapshot) => sendMessage(snapshot.docs.map((doc) => doc.data())))
  //     }
  //     // console.log(roomId);
  // }, [roomId])

  //   const getTime = () => {
  //     var today = new Date();
  //     var time =
  //       today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  //     return time;
  //   };

  const sendMessage = (e) => {};
  //     e.preventDefault();

  //     axios.post('/messages/new', {
  //       message: input,
  //       name: 'ddd',
  //       timestamp: getTime(),
  //       received: true,
  //     });
  //     setInput('');
  //   };
  //   const date = (messId) => {
  //     let timestamp = messId.substring(0, 8);
  //     let convertFromHex = parseInt(timestamp, 16);

  //     // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  //     let date = new Date(convertFromHex * 1000);
  //     // Hours part from the timestamp
  //     let hours = date.getHours();
  //     // Minutes part from the timestamp
  //     let minutes = '0' + date.getMinutes();
  //     // Seconds part from the timestamp
  //     let seconds = '0' + date.getSeconds();

  //     // Will display time in 10:30:23 format
  //     let formattedTime =
  //       hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  //     return formattedTime;
  //   };

  return (
    <div className='chat-box'>
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
        {/* {messages.map((message) => ( */}
        {/* //   <p className={`chat-message ${message.received && 'chat-reciever'}`}>
        //     <span className='chat-name'>john</span>

        //     <span className='chat-timestamp'>9:00</span>
        //   </p>
          // <p className={ `chat-message ${ message.received && "chat-reciever"}` }>
          // <span className="chat-name">{message.name}</span>
          // {message.message}
          // <span className="chat-timestamp">{message._id ?date(message._id) : message.timestamp}</span>
          // </p>
          ))} */}
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
    </div>
  );
};

export default ChatBox;
