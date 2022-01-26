import React, { useState, useEffect, useRef } from 'react';

import { IconButton, makeStyles, Avatar } from '@material-ui/core';
// import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

// import profile from '../../assets/profile.jpg';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupParticipant from '../groupParticipant/GroupParticipant';
import UploadFile from '../uploadFile/UploadFile';
import { useSelector } from 'react-redux';
import editting from '../../assets/rename_icon.png';
import axios from '../../axios';
import './GroupDetails.css';
import '../megaMenu/MegaMenu.css';

const useStyles = makeStyles({
  profileImg: {
    width: '144px',
    height: '144px',
  },
  closeBtn: {
    backgroundColor: '#d4d4df',
  },
  deleteChat: {
    color: 'red',
  },
});

const GroupGetails = ({
  currentChat,
  setChatModal,
  setGroupModal,
  setAddPerson,
}) => {
  const classes = useStyles();
  const inputFile = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [adminFeatures, setAdminFeatures] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [changeName, setChangeName] = useState(false);

  useEffect(() => {
    currentChat?.admin.forEach((id) => {
      if (id === currentUser?.uid) setAdminFeatures(true);
    });
  }, [currentUser?.uid, currentChat?.admin]);

  const isAdmin = (id) => {
    // console.log(id);
    let flag;
    currentChat?.admin.forEach((admin) => {
      //   console.log(admin === id);
      if (admin === id) {
        flag = true;
        return;
      } else {
        flag = false;
      }
    });
    return flag;
  };

  const addParticipant = () => {
    setChatModal(true);
    setGroupModal(false);
    setAddPerson(true);
  };

  const changeGroupName = async (event) => {
    event.preventDefault();
    setChangeName(!changeName);

    try {
      console.log(currentChat?._id);
      const res = await axios.patch(
        '/api/v1/conversations/' + currentChat?._id,
        {
          groupName: newGroupName,
        }
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteChat = async (event) => {
    event.preventDefault();
    try {
      await axios.patch('/api/v1/members/?chatId=' + currentChat?._id, {
        deleteMemberId: currentUser.uid,
      });
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleUploadFile = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setNewGroupName(event.target.value);
  };

  console.log(changeName);
  return (
    <div className='groupDetails-inner-container'>
      <div className='groupDetails-profile'>
        <div className='groupDetails-img'>
          <IconButton onClick={handleUploadFile}>
            <Avatar
              className={classes.profileImg}
              src={currentChat?.profilePicture}
            />
            <UploadFile currentChat={currentChat} inputFile={inputFile} />
            {/* {clickUploadFile ? (
              
            ) : null} */}
          </IconButton>
        </div>
        <div className='groupDetails-name-container'>
          <p
            className={`groupDetails-name ${
              changeName ? 'change-groupDetails-name' : ''
            }`}
          >
            Name:{' '}
            {changeName ? (
              <input
                type='text'
                value={newGroupName}
                onChange={handleInputChange}
              />
            ) : (
              currentChat?.groupName
            )}
          </p>
          <div
            className={adminFeatures ? 'groupDetails-create-icon' : 'hidden'}
          >
            {!changeName ? (
              <IconButton onClick={() => setChangeName(!changeName)}>
                <CreateIcon />
              </IconButton>
            ) : (
              <IconButton onClick={changeGroupName}>
                <img
                  className='groupDetails-edit-icon'
                  src={editting}
                  alt='edit icon'
                />
              </IconButton>
            )}
          </div>
        </div>
      </div>
      <div className='groupDetails-files-container'>
        <div className='groupDetails-title'>
          <p>Fils</p>
          <IconButton>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
        <div></div>
      </div>
      <div className='groupDetails-friends-list'>
        <div className='groupDetails-title-friends-list'>
          <p>Friends List:</p>
          <p>{currentChat?.members.length} Partcipants</p>
        </div>
        <div className={adminFeatures ? 'groupDetails-add-person' : 'hidden'}>
          <IconButton onClick={addParticipant}>
            <PersonAddIcon />
          </IconButton>
          <p>Adding participants</p>
        </div>

        <div
          className={`groupDetails-list ${
            !adminFeatures ? 'groupDetails-not-admin' : ''
          }`}
        >
          {currentChat?.userInfo.map((user, i) => (
            // console.log(isAdmin);
            <GroupParticipant
              key={i}
              userInfo={user}
              isAdmin={isAdmin(user.userid)}
              adminFeatures={adminFeatures}
              currentChat={currentChat}
            />
          ))}
        </div>
      </div>
      <div className='mega-menu-delete-friend'>
        <div className='mega-menu-title-delete-friend'>
          <IconButton className={classes.deleteChat} onClick={handleDeleteChat}>
            <DeleteIcon />
          </IconButton>

          <p>Delete chat</p>
        </div>
      </div>
      <div className='OptionDoAdd'></div>
    </div>
  );
};

export default GroupGetails;
