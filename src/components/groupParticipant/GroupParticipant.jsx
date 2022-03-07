import React, { useState } from 'react';
import deleteUser from '../../apiCalls';
import { IconButton, Avatar, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import './GroupParticipant.css';

const useStyles = makeStyles({
  deleteBtn: {
    color: 'black',
    '&:hover': {
      backgroundColor: '#ff9191',
    },
  },
});

const GroupParticipant = ({
  userInfo,
  isAdmin,
  adminFeatures,
  currentChat,
}) => {
  const classes = useStyles();
  const [seeInfo, setSeeInfo] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className={`groupPart-friend ${seeInfo ? 'toSeeInfo' : ''}`}>
      <div className='groupPart-friend-top'>
        <div className='groupPart-friend-left'>
          {adminFeatures ? (
            <IconButton
              onClick={(e) => deleteUser(e, currentChat, userInfo)}
              className={classes.deleteBtn}
            >
              <CloseIcon />
            </IconButton>
          ) : null}

          <p className='groupPart-friend-name'>{userInfo.username}</p>
        </div>
        <div className='groupPart-friend-right'>
          {isAdmin ? <p className='groupPart-manager'>manager</p> : null}
          <IconButton onClick={() => setSeeInfo(!seeInfo)}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
      </div>
      <div className={seeInfo ? 'groupPart-info' : 'hidden'}>
        <Avatar src={userInfo.profilePicture} />
        <p className='groupPart-email'>{userInfo.useremail}</p>
      </div>
    </div>
  );
};

export default GroupParticipant;
