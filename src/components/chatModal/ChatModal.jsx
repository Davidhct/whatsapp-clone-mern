import React, { useState } from 'react';
import { makeStyles, IconButton } from '@material-ui/core';

import FormInput from '../formInput/FormInput';
import CustomButton from '../customButton/CustomButton';
import axios from '../../axios';

import { useSelector } from 'react-redux';

import './ChatModal.css';

const useStyles = makeStyles({
  iconButton: {
    padding: '5px',
    width: '15%',
    '&:hover': {
      backgroundColor: '#ebebf0',
    },
  },
});

const ChatModal = ({
  setChatModal,
  chatModal,
  addPerson,
  setAddPerson,
  currentChat,
}) => {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.user);
  const [input, setinput] = useState('');

  //       //joun@example.com

  const createFreindship = async (data) => {
    // console.log('data: ', data.username);
    await axios.post('/api/v1/conversations/', {
      groupName: data[0].username,
      isGroup: false,
      members: [currentUser.uid, data[0].userid],
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
  };
  const isExistsMember = async (id, chatId) => {
    let isMember = false;
    try {
      const res = await axios.get('/api/v1/members/?chatId=' + chatId);
      const members = [...res?.data.data];
      console.log(members);
      members.forEach((mbr) => {
        if (mbr === id) {
          isMember = true;
        }
      });
    } catch (err) {
      console.error(err.message);
    }
    return isMember;
  };
  const checkAndGetUser = async () => {
    let res;
    try {
      const resUser = await axios.put('/api/v1/users/', {
        group: false,
        friendsList: input,
      });
      res = [...resUser?.data];
    } catch (err) {
      console.error(err.message);
    }

    return res;
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    setChatModal(!chatModal);
    const addPersonToGroup = async () => {
      try {
        const resUser = await checkAndGetUser();
        const memberExists = await isExistsMember(
          resUser[0].userid,
          currentChat?._id
        );
        if (!memberExists) {
          await axios.patch('/api/v1/members/?chatId=' + currentChat?._id, {
            addPerson: [resUser[0].userid],
            // members: [resUser[0].userid],
            // userInfo: [...resUser],
          });
          await axios.patch('/api/v1/userInfo/?chatId=' + currentChat?._id, {
            addPerson: [...resUser],
          });
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    setAddPerson(false);
    addPersonToGroup();
    setinput('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setChatModal(!chatModal);
    let resUser;
    const getUser = async () => {
      try {
        // check if the user is in the database
        resUser = await checkAndGetUser();

        console.log(resUser);
        if (resUser?.length > 0) {
          // get all conversation
          const resConvers = await axios.get('/api/v1/conversations/');
          // console.log(resConvers?.data.data);
          const convers = resConvers?.data.data;
          if (convers.length > 0) {
            // console.log(convers);
            for (let i = 0; i < convers.length; i++) {
              if (!convers[i].isGroup && convers[i].members.length === 1) {
                // console.log(convers);
                const friend = convers[i].userInfo.find(
                  (usr) => usr.userid !== input
                );
                // connct to old conversation
                friend &&
                  (await axios.patch(
                    '/api/v1/members/?chatId=' + convers[i]._id,
                    {
                      addPerson: [currentUser.uid],
                    }
                  ));
                return;
              } else if (i === convers.length - 1) {
                createFreindship(resUser);
                return;
              }
            }
          }
        } else {
          createFreindship(resUser);
          return;
        }

        //     //joun@example.com
      } catch (err) {
        console.error(err.message);
      }
    };

    getUser();
    setinput('');
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(name);
    if (name === 'email') {
      setinput(value);
    }
  };

  const closeModal = () => {
    setChatModal(!chatModal);
    setAddPerson(false);
  };

  return (
    <div className='new-msg-container'>
      <div className='exit-wrapper'>
        <div className='exit'>
          <IconButton className={classes.iconButton} onClick={closeModal}>
            <div className='exit-button'>&times;</div>
          </IconButton>
        </div>
      </div>
      <div className='title-modal'>
        <h2>{addPerson ? 'Add person' : 'Start chatting'}</h2>
      </div>

      <div className='new-msg-modal'>
        <form onSubmit={addPerson ? handleAddPerson : handleSubmit}>
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
    </div>
  );
};

export default ChatModal;
