import React, { useState } from 'react';

import { IconButton, Avatar, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import axios from '../../axios';

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

  const deleteUser = async (event) => {
    event.preventDefault();
    let newAdmin;
    try {
      // delete yourself from be in the manager if you'r the only manager,
      // and make someone else to be the manager.
      // currentChat?.admin.length === 1 &&
      currentChat?.admin.forEach(async (admin) => {
        if (admin === userInfo.userid) {
          if (currentChat?.admin.length === 1) {
            newAdmin = currentChat?.members.find(
              (member) => member !== userInfo.userid
            );
            await axios.patch('/api/v1/admin/?chatId=' + currentChat?._id, {
              addAdminId: newAdmin,
            });
          }

          console.log(newAdmin);
          await axios.patch('/api/v1/admin/?chatId=' + currentChat?._id, {
            deleteAdminId: admin,
          });
        }
      });
      const { userid, username, profilePicture, useremail } = { ...userInfo };

      await axios.patch('/api/v1/members/?chatId=' + currentChat?._id, {
        deleteMemberId: userid,
      });
      await axios.patch('/api/v1/userInfo/?chatId=' + currentChat?._id, {
        deleteUserInfo: { userid, username, profilePicture, useremail },
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={`groupPart-friend ${seeInfo ? 'toSeeInfo' : ''}`}>
      <div className='groupPart-friend-top'>
        <div className='groupPart-friend-left'>
          {adminFeatures ? (
            <IconButton onClick={deleteUser} className={classes.deleteBtn}>
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
