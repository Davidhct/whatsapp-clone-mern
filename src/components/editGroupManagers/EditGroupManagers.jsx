import React, { useState, useEffect } from 'react';
import { IconButton, Avatar, makeStyles } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { useSelector } from 'react-redux';
import axios from '../../axios';
import './EditGroupManagers.css';
import '../groupParticipant/GroupParticipant.css';

const useStyles = makeStyles({
  removeManager: {
    color: 'red',
  },
  addManager: {
    color: 'green',
  },
});

const EditGroupManagers = ({ userInfo, isAdmin, currentChat }) => {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.user);
  const handleAddManager = (event) => {
    event.preventDefault();
    let newManager = userInfo.userid;
    const addManager = async () => {
      try {
        await axios.patch('/api/v1/admin/?chatId=' + currentChat?._id, {
          addAdminId: newManager,
        });
      } catch (err) {
        console.error(err.message);
      }
    };
    addManager();
  };
  const handleRemoveManager = (event) => {
    event.preventDefault();
    let newManager = userInfo.userid;
    const removeManager = async () => {
      try {
        if (currentChat?.admin.length === 1) {
          let newAdmin = currentChat?.members.find(
            (member) => member !== userInfo.userid
          );
          await axios.patch('/api/v1/admin/?chatId=' + currentChat?._id, {
            addAdminId: newAdmin,
          });
        }
        await axios.patch('/api/v1/admin/?chatId=' + currentChat?._id, {
          deleteAdminId: newManager,
        });
      } catch (err) {
        console.error(err.message);
      }
    };
    removeManager();
  };
  return (
    <div className='editManagers-container'>
      <div className='editManagers-left'>
        <div className='editManagers-img'>
          <IconButton>
            <Avatar src={userInfo?.profilePicture} />
          </IconButton>
        </div>
        <div className='editManagers-name-wrapper'>
          <p className='editManagers-name'>{userInfo.username}</p>
        </div>
      </div>
      <div className='editManagers-right'>
        <div className='editManagers-manager-title'>
          {isAdmin ? <p className='groupPart-manager'>manager</p> : null}
        </div>
        <div>
          {isAdmin ? (
            <IconButton
              className={classes.removeManager}
              onClick={handleRemoveManager}
            >
              <RemoveIcon />
            </IconButton>
          ) : (
            <IconButton
              className={classes.addManager}
              onClick={handleAddManager}
            >
              <AddIcon />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditGroupManagers;
