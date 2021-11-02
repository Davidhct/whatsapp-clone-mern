import React, { useState, useEffect } from 'react';
import { makeStyles, IconButton } from '@material-ui/core';

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
});

const NewMessageModal = ({ typeInput, message, setModal, showModal }) => {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.user);
  const [input, setinput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const getUser = async () => {
      try {
        const resUser = await axios.get('/api/v1/users/' + input);
        console.log(currentUser);
        if (resUser?.data !== '') {
          const res = await axios.post('/api/v1/private/', {
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
        console.log(resUser?.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    getUser();
    setModal(!showModal);
    setinput('');
    // console.log(conversation);
  };

  const handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setinput(event.target.value);
  };

  return (
    <div className='new-msg-container'>
      <div className='exit'>
        <IconButton className={classes.iconButton}>
          <button className='exit-button' onClick={() => setModal(!showModal)}>
            &times;
          </button>
        </IconButton>
      </div>
      <div className='new-msg-modal'>
        <h2>{message}</h2>
        <form onSubmit={handleSubmit}>
          <div className='new-msg-input'>
            <FormInput
              type={typeInput}
              name={typeInput}
              label={typeInput}
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

export default NewMessageModal;
