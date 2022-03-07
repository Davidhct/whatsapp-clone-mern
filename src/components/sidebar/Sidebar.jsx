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

const Sidebar = ({
  setCurrentChat,
  setUserPic,
  setUserName,
  setGroupModal,
  setChatModal,
}) => {
  const classes = useStyles();
  const [conversations, setConversations] = useState([]);
  const [menuDrop, setMenuDrop] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getConversations = async () => {
      try {
        if (currentUser) {
          const res = await axios.get(
            '/api/v1/conversations/' + currentUser.uid
          );
          setConversations(res.data?.data.slice().reverse());
        }
      } catch (err) {
        console.error(err);
      }
    };
    getConversations();
  }, [currentUser]);

  const findeLastMessage = (msg) => {
    // console.log(msg);
    let lastMsg = msg.messages[msg.messages.length - 1];
    return lastMsg.text;
  };

  const findUserInfo = (msg) => {
    let userIn;
    if (!msg.isGroup) {
      for (let i = 0; i < msg.userInfo.length; i++) {
        if (msg.userInfo[i].userid !== currentUser.uid) {
          userIn = msg.userInfo[i];
          break;
        }
      }
    } else if (msg.isGroup) {
      userIn = {
        username: msg.groupName,
        profilePicture: msg.profilePicture,
      };
    }
    return userIn;
  };

  const handleClick = (msg) => {
    setCurrentChat(msg);
    // console.log(msg, 'ccccccccccccccccccccccccccccccccc');
    if (!msg.isGroup) {
      msg.userInfo.forEach((u) => {
        if (u.userid !== currentUser.uid) {
          setUserPic(u.profilePicture);
          setUserName(u.username);
          // console.log(u);
        }
      });
    } else if (msg.isGroup) {
      setUserName(msg.groupName);
      setUserPic(msg.profilePicture);
    }
  };
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
          <IconButton
            className={menuDrop ? classes.moreVert : null}
            onClick={() => setMenuDrop(!menuDrop)}
          >
            <MoreVertIcon />
          </IconButton>
          <div className={menuDrop ? 'menu-drop-sidebar' : 'hidden'}>
            <MenuDropdown
              isSidebar={true}
              setChatModal={setChatModal}
              setGroupModal={setGroupModal}
            />
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
          conversations.map((msg, i) => (
            <div onClick={() => handleClick(msg)}>
              <SidebarChat
                key={i}
                userInfo={findUserInfo(msg)}
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
