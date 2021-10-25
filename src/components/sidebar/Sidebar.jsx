import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from '../sidebarChat/SidebarChat';
import { useSelector } from 'react-redux';
import axios from './../../axios';

// import { db } from '../../firebase.utils';
import './Sidebar.css';

const Sidebar = ({ currentChat, setCurrentChat }) => {
  // const [rooms, setRooms] = useState([]);
  const [conversations, setConversations] = useState([]);
  // const [currentChat, setCurrentChat] = useState(null);
  // const [messages, setMessages] = useState([]);

  const { currentUser } = useSelector((state) => state.user);
  // const [lastMessage, setLastMessage] = useState('');
  // const dispatch = useDispatch();
  // console.log(currentUser.uid);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get('/api/v1/private/' + currentUser.uid);
        setConversations(res.data?.data);
        console.log(res.data?.data);
      } catch (err) {
        console.error(err);
      }
    };
    getConversations();
  }, [currentUser.uid]);
  // useEffect(() => {
  //   let lastMsg = currentChat?.messages[currentChat?.messages.length - 1];
  //   if (lastMsg.sender === user?.userid) {
  //     setLastMessage(lastMsg.text);
  //   } else if (lastMsg.sender === currentUser.uid) {
  //     setLastMessage(lastMsg.text);
  //   }
  // }, [currentChat, user]);
  const findeLastMessage = (msg) => {
    let lastMsg = msg.messages[msg.messages.length - 1];
    return lastMsg.text;
  };

  // console.log(currentUser);
  console.log(conversations);
  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <Avatar src={currentUser?.photoURL} />
        <div className='sidebar-header-right'>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className='sidebar-search'>
        <div className='sidebar-search-container'>
          <SearchIcon />
          <input type='text' placeholder='Search or start new chat' />
        </div>
      </div>
      <div className='sidebar-chats'>
        {conversations ? (
          conversations.map((msg) => (
            <div onClick={() => setCurrentChat(msg)}>
              <SidebarChat
                key={msg._id}
                conversation={msg}
                currentUser={currentUser}
                id={msg._id}
                currentChat={currentChat}
                lastMessage={findeLastMessage(msg)}
              />
            </div>
          ))
        ) : (
          <div>there is no users</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
