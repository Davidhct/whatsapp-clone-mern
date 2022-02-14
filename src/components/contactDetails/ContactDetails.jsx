import React, { useState, useEffect } from 'react';

import { IconButton, makeStyles, Avatar } from '@material-ui/core';
// import CloseIcon from '@material-ui/icons/Close';
// import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
// import {  } from '@material-ui/core';
import profile from '../../assets/profile.jpg';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import PersonAddIcon from '@material-ui/icons/PersonAdd';
// import GroupParticipant from '../groupParticipant/GroupParticipant';
import { useSelector } from 'react-redux';
// import editting from '../../assets/rename_icon.png';
import Swal from 'sweetalert2';

import DeleteChatBtn from '../deleteChatBtn/DeleteChatBtn';
import axios from '../../axios';
import './ContactDetails.css';

const useStyles = makeStyles({
  profileImg: {
    width: '144px',
    height: '144px',
  },
  deleteChat: {
    color: 'red',
  },
});

const ContactDetails = ({ currentChat }) => {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.user);
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const friendDetails = currentChat?.userInfo.find(
      (frnd) => currentUser.uid !== frnd.userid
    );
    setFriend(friendDetails);
  }, [currentChat]);

  console.log(friend);
  return (
    <div className='contactDetails-inner-container'>
      <div className='contactDetails-profile'>
        <div className='contactDetails-img'>
          <IconButton>
            <Avatar
              className={classes.profileImg}
              src={friend?.profilePicture || ''}
            />
          </IconButton>
        </div>
        <div className='contactDetails-name-container'>
          <p className='contactDetails-name'>{friend?.username}</p>
          <p className='contactDetails-email'>{friend?.useremail}</p>
        </div>
      </div>
      <div className='contactDetails-files-container'>
        <div className='mega-menu-title'>
          <p>Fils</p>
          <IconButton>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
        <div></div>
      </div>

      <DeleteChatBtn currentChat={currentChat} />
      <div className='OptionDoAdd'></div>
    </div>
  );
};

export default ContactDetails;
