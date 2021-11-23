import React, { useState } from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import FormInput from '../formInput/FormInput';
import CustomButton from '../customButton/CustomButton';
import axios from './../../axios';
import { useSelector } from 'react-redux';

import './GroupModal.css';

const useStyles = makeStyles({
  iconButton: {
    padding: '5px',
    width: '13%',
    '&:hover': {
      backgroundColor: '#ebebf0',
    },
  },
  addGroupBtn: {
    color: 'black',
    '&:hover': {
      backgroundColor: '#c3c3c7',
    },
  },
  deleteBtn: {
    color: 'black',
    '&:hover': {
      backgroundColor: '#ff9191',
    },
  },
});

const GroupModal = ({ setGroupModal, groupModal }) => {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.user);
  const [input, setinput] = useState('');
  // const [isOnePerson, setMorePersons] = useState(-1);
  const [groupName, setGroupName] = useState('');
  const [groupList, setGroupList] = useState([]);

  const createFreindship = async (data) => {
    console.log('data: ', data);
    let usersIds = [];
    let isAdmin = [];
    let grName;
    data.forEach((usr) => {
      usersIds.push(usr.userid);
    });

    grName = groupName;
    isAdmin.push(currentUser.uid);
    if (groupName.length === 0) {
      grName = 'New group';
    }

    const res = await axios.post('/api/v1/conversations/', {
      admin: isAdmin,
      groupName: grName,
      isGroup: true,
      members: [currentUser.uid, ...usersIds],
      userInfo: [
        {
          userid: currentUser.uid,
          username: currentUser.displayName,
          profilePicture: currentUser.photoURL,
          useremail: currentUser.email,
        },
        ...data,
      ],
      messages: [{ sender: null, text: null, isRead: false }],
    });
    console.log(res);
    return res;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // close the group modal
    setGroupModal(!groupModal);

    const getUser = async () => {
      try {
        const resUser = await axios.put('/api/v1/users/', {
          group: true,
          friendsList: groupList,
        });
        console.log(resUser?.data);
        if (resUser?.data.length !== 0) {
          createFreindship(resUser?.data);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    getUser();
    setGroupName('');
    setGroupList([]);
    setinput('');
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    if (name === 'email') {
      setinput(value);
    } else {
      setGroupName(value);
    }
  };

  const renderGroupList = (event) => {
    event.preventDefault();
    if (input.includes('@') && input.includes('.')) {
      const list = [...groupList];
      setGroupList([input, ...list]);
    }
    setinput('');
  };

  const handleDeleteClick = (event, i) => {
    event.preventDefault();
    const list = [...groupList];
    list.splice(i, 1);
    setGroupList([...list]);
  };

  return (
    <div className='new-msg-container'>
      <div className='exit-wrapper'>
        <div className='exit'>
          <IconButton
            className={classes.iconButton}
            onClick={() => setGroupModal(!groupModal)}
          >
            <div className='exit-button'>&times;</div>
          </IconButton>
        </div>
      </div>
      <div className='title-modal'>
        <h2>Start chatting</h2>
      </div>
      <div className='new-msg-modal new-group-msg-modal'>
        <form onSubmit={handleSubmit}>
          <div className='group-input-wrapper'>
            <div className='new-input-mail'>
              <>
                <FormInput
                  type='email'
                  name='email'
                  label='email'
                  value={input}
                  handleChange={handleChange}
                />
              </>
              <div className='new-msg-group-button'>
                <IconButton
                  className={classes.addGroupBtn}
                  onClick={renderGroupList}
                >
                  <GroupAddRoundedIcon />
                </IconButton>
              </div>
            </div>
            <div className='group-name'>
              <FormInput
                type='text'
                name='group name'
                label='group name'
                value={groupName}
                handleChange={handleChange}
              />
            </div>
          </div>
          <div className='new-msg-input new-group-msg-input'>
            {groupList.map((item, i) => {
              return (
                <div key={i} className='item-group'>
                  <div className='item-wrapper'>{item}</div>
                  <div className='delete-btn'>
                    <IconButton
                      className={classes.deleteBtn}
                      onClick={(e) => handleDeleteClick(e, i)}
                    >
                      <HighlightOffRoundedIcon />
                    </IconButton>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='new-msg-button'>
            <CustomButton type='submit'>Add</CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupModal;
