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

const Sidebar = ({ setCurrentChat }) => {
  // const [rooms, setRooms] = useState([]);
  const [conversations, setConversations] = useState([]);
  // const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const { currentUser } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  // console.log(currentUser.uid);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get('/api/v1/conversations/' + currentUser.uid);
        setConversations(res.data);
        console.log(res.data);
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
  // console.log(currentUser);
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
        {!conversations ? (
          <SidebarChat addNewChat />
        ) : (
          conversations.map((c) => (
            <div onClick={() => setCurrentChat(c)}>
              <SidebarChat
                conversation={c}
                currentUser={currentUser}
                id={currentUser.uid}
              />
            </div>
          ))
        )}
        {/*  */}
        {}
      </div>
    </div>
  );
};

export default Sidebar;
