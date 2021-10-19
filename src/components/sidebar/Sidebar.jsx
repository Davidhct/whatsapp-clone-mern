import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from '../sidebarChat/SidebarChat';
import { useDispatch, useSelector } from 'react-redux';
import axios from './../../axios';

// import { db } from '../../firebase.utils';
import './Sidebar.css';

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [conversations, setConversations] = useState([]);

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log(currentUser.uid);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get('/api/v1/conversations/' + currentUser.uid);
        setConversations(res.data);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };
    getConversations();
  }, [currentUser.uid]);

  useEffect(() => {
    // const unsubscribe = db.collection('users').onSnapshot((snapshot) =>
    //   setRooms(
    //     snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       data: doc.data(),
    //     }))
    //   )
    // );
    // return () => {
    //   unsubscribe();
    // };
  }, []);
  console.log(conversations);
  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <Avatar />
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
        <SidebarChat addNewChat />
        {conversations.map((c) => (
          <SidebarChat
            conversation={c}
            currentUserId={currentUser.uid}
            id={currentUser.uid}
            name={currentUser.displayName}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
