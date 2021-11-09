import React, { useState, useEffect } from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import FormInput from '../formInput/FormInput';
import CustomButton from '../customButton/CustomButton';
import axios from './../../axios';
import { useSelector } from 'react-redux';

import './NewMessageModal.css';

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

const NewMessageModal = ({ setModal, showModal, isGroup }) => {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.user);
  const [input, setinput] = useState('');
  const [isOnePerson, setMorePersons] = useState(-1);
  const [groupName, setGroupName] = useState('');
  const [groupList, setGroupList] = useState([]);

  const handleChatSubmit = (event) => {
    event.preventDefault();

    const getUser = async () => {
      // let flag = true;
      let addPerson = undefined;
      try {
        const resUser = await axios.get('/api/v1/users/' + input);
        console.log(resUser?.data);
        if (resUser?.data !== '') {
          const resPrv = await axios.get('/api/v1/private');
          // console.log(resPrv?.data);
          const convePrv = resPrv?.data.data;
          // console.log(convePrv.length);
          for (let i = 0; i < convePrv.length; i++) {
            if (convePrv[i].members.length === 1) {
              // console.log(convePrv);
              if (convePrv[i].members[0] === resUser?.data.userid) {
                console.log(convePrv);
                addPerson = convePrv[i];

                setMorePersons(2);
                break;
              } else if (convePrv[i].members[0] === currentUser.uid) {
                addPerson = convePrv[i];
                setMorePersons(0);
                break;
              }
            }

            if (i === convePrv.length - 1) {
              console.log(isOnePerson);
              setMorePersons(1);
            }
          }
          // convePrv.map((convePrv) => {

          //   // console.log(res?.data);
          // });
        }
        console.log(isOnePerson);
        if (isOnePerson === 2) {
          console.log(isOnePerson);
          const res = await axios.patch(
            '/api/v1/private/?chatId=' + addPerson._id,
            {
              members: [currentUser.uid],
            }
          );
          // setMorePersons(1);
        }
        if (isOnePerson === 0) {
          console.log(isOnePerson);
          const res = await axios.delete('/api/v1/private/' + addPerson._id);
          // setMorePersons(1);
        }

        //joun@example.com
        if (resUser?.data !== '' && isOnePerson === 1) {
          console.log(isOnePerson);
          const res = await axios.post('/api/v1/private/', {
            groupName: resUser?.data.username,
            isGroup: false,
            members: [currentUser.uid, resUser?.data.userid],
            userInfo: [
              {
                userid: currentUser.uid,
                username: currentUser.displayName,
                profilePicture: currentUser.photoURL,
              },
              {
                userid: resUser?.data.userid,
                username: resUser?.data.username,
                profilePicture: resUser?.data.profilePicture,
              },
            ],
            messages: [{ sender: null, text: null, isRead: false }],
          });
        }
        // console.log(resUser?.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    getUser();
    setModal(!showModal);
    setinput('');
    setMorePersons(-1);
    // console.log(conversation);
  };

  const handleGroupSubmit = (event) => {
    event.preventDefault();
    const getUser = async () => {
      try {
        const resUser = await axios.put('/api/v1/users/', {
          group: true,
          groupList: groupList,
        });
        console.log(resUser?.data);
        if (resUser?.data.length !== 0) {
          const res = await axios.post('/api/v1/conversations/', {
            groupName: groupName.trim(),
            isGroup: true,
            members: [currentUser.uid, ...resUser?.data.userid],

            userInfo: [
              {
                userid: currentUser.uid,
                username: currentUser.displayName,
                profilePicture: currentUser.photoURL,
              },
              {
                userid: resUser?.data.userid,
                username: resUser?.data.username,
                profilePicture: resUser?.data.profilePicture,
              },
            ],
            messages: [{ sender: null, text: null, isRead: false }],
          });
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    getUser();

    // setGroup(false);
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(name);
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
    <div className='new-msg-container new-group-msg-container'>
      <div className='exit-wrapper'>
        <div className='exit'>
          <IconButton
            className={classes.iconButton}
            onClick={() => setModal(!showModal)}
          >
            <div className='exit-button'>&times;</div>
          </IconButton>
        </div>
      </div>
      <div className='title-modal'>
        <h2>Start chatting</h2>
      </div>
      {!isGroup ? (
        <div className='new-msg-modal'>
          <form onSubmit={handleChatSubmit}>
            <div className='new-msg-input'>
              <FormInput
                type='email'
                name='email'
                label='email'
                value={input}
                handleChange={handleChange}
              />
            </div>
            <div className='new-msg-button'>
              <CustomButton type='submit'>Add</CustomButton>
            </div>
          </form>
        </div>
      ) : (
        <div className='new-msg-modal new-group-msg-modal'>
          <form onSubmit={handleGroupSubmit}>
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
      )}
    </div>
  );
};

export default NewMessageModal;
