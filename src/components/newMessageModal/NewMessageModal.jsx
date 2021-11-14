import React, { useState } from 'react';
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

const NewMessageModal = ({
  setModal,
  showModal,
  isGroup,
  addPerson,
  setPerson,
  currentChat,
}) => {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.user);
  const [input, setinput] = useState('');
  // const [isOnePerson, setMorePersons] = useState(-1);
  const [groupName, setGroupName] = useState('');
  const [groupList, setGroupList] = useState([]);

  const reconnectMember = async (user) => {
    try {
      await axios.patch('/api/v1/conversations/?chatId=' + user._id, {
        reconnect: true,
        members: [currentUser.uid],
      });
    } catch (err) {
      console.error(err.message);
    }
  };
  const addNewMember = async (user) => {
    console.log(user);
    try {
      const res = await axios.patch(
        '/api/v1/conversations/?chatId=' + currentChat?._id,
        {
          addPerson: true,
          members: [user.userid],
          userInfo: [user],
        }
      );
      console.log(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  const deleteMember = async (user) => {
    try {
      await axios.delete('/api/v1/conversations/' + user._id);
      // console.log(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  const checkGetUser = async () => {
    let data;
    try {
      const res = await axios.put('/api/v1/users/', {
        group: false,
        friendsList: input,
      });
      data = res?.data;
    } catch (err) {
      console.error(err.message);
    }
    return data;
  };

  const handleChatSubmit = (event) => {
    event.preventDefault();

    const getUser = async () => {
      // let addPerson = undefined;
      try {
        const resUser = await checkGetUser();
        console.log(resUser);
        if (resUser?.length > 0) {
          const resPrv = await axios.get('/api/v1/conversations/');
          // console.log(resPrv?.data);
          const convePrv = resPrv?.data.data;
          if (convePrv.length > 0) {
            for (let i = 0; i < convePrv.length; i++) {
              if (convePrv[i].members.length === 1) {
                console.log(resUser[0].userid);
                if (convePrv[i].members[0] === resUser[0].userid) {
                  console.log(convePrv);
                  // addPerson = convePrv[i];
                  await reconnectMember(convePrv[i]);
                  // setMorePersons(2);
                  return;
                } else if (convePrv[i].members[0] === currentUser.uid) {
                  // addPerson = convePrv[i];
                  deleteMember(convePrv[i]);
                  // setMorePersons(0);
                  break;
                }
              }

              if (i === convePrv.length - 1) {
                const res = await createFreindship(false, resUser);
                console.log('from chat: ', res);
              }
            }
          } else {
            const res = await createFreindship(false, resUser);
            console.log('from chat: ', res);
          }
        }
        //joun@example.com
      } catch (err) {
        console.error(err.message);
      }
    };
    if (addPerson === true) {
      const addUser = async () => {
        try {
          const resUser = await checkGetUser();
          await addNewMember(resUser[0]);
          console.log(resUser);
        } catch (err) {
          console.error(err.message);
        }
      };
      addUser();
    } else {
      getUser();
    }
    setPerson(false);
    setModal(!showModal);
    setinput('');

    // console.log(conversation);
  };

  const createFreindship = async (group, data) => {
    let usersIds = [];
    let isAdmin = [];
    let grName;
    data.map((usr) => {
      usersIds.push(usr.userid);
    });
    if (!group) {
      grName = data[0].username;
    } else if (group) {
      grName = groupName;
      isAdmin.push(currentUser.uid);
      if (groupName.length === 0) {
        grName = 'New group';
      }
    }
    console.log(group);
    console.log(grName);
    console.log(usersIds);

    const res = await axios.post('/api/v1/conversations/', {
      admin: isAdmin,
      groupName: grName,
      isGroup: group,
      members: [currentUser.uid, ...usersIds],
      userInfo: [
        {
          userid: currentUser.uid,
          username: currentUser.displayName,
          profilePicture: currentUser.photoURL,
        },
        ...data,
      ],
      messages: [{ sender: null, text: null, isRead: false }],
    });

    return res;
  };

  const handleGroupSubmit = (event) => {
    event.preventDefault();
    const getUser = async () => {
      try {
        const resUser = await axios.put('/api/v1/users/', {
          group: true,
          friendsList: groupList,
        });
        console.log(resUser?.data);
        if (resUser?.data.length !== 0) {
          const res = createFreindship(true, resUser?.data);
          console.log('from group: ', res);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    getUser();
    setGroupName('');
    setGroupList([]);
    setModal(!showModal);
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
