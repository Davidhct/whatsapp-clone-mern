import React, { useState, useEffect } from 'react';
import { Avatar, IconButton, makeStyles } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from '../sidebarChat/SidebarChat';
import { useSelector } from 'react-redux';
import axios from './../../axios';
import MenuDropdown from '../menuDropdown/MenuDropdown';
// import { db } from '../../firebase.utils';
import './Sidebar.css';

const useStyles = makeStyles({
  moreVert: {
    backgroundColor: '#d4d4df',
  },
});

const Sidebar = ({ currentChat, setCurrentChat, setUserPic, setUserName }) => {
  // const [rooms, setRooms] = useState([]);
  const classes = useStyles();
  const [conversations, setConversations] = useState([]);
  const [menuDrop, setMenuDrop] = useState(false);
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

  const handleClick = (e, msg) => {
    setCurrentChat(msg);
    // console.log(msg.userInfo, 'ccccccccccccccccccccccccccccccccc');
    if (msg.userInfo.length < 3) {
      msg.userInfo.map((u) => {
        if (u.userid !== currentUser) {
          setUserPic(u.profilePicture);
          setUserName(u.username);
          console.log(u);
        }
      });
    }
  };

  console.log(currentChat);
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
          <IconButton className={menuDrop ? classes.moreVert : null}>
            <MoreVertIcon onClick={() => setMenuDrop(!menuDrop)} />
          </IconButton>
          <div className={menuDrop ? 'menu-drop' : 'hidden'}>
            <MenuDropdown menuDrop={menuDrop} />
          </div>
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
            <div onClick={(e) => handleClick(e, msg)}>
              <SidebarChat
                value={msg._id}
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
