import React, { useState } from 'react';
import { makeStyles, IconButton } from '@material-ui/core';

import FormInput from '../formInput/FormInput';
import CustomButton from '../customButton/CustomButton';

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

const ChatModal = ({ setChatModal, chatModal, setModalInput }) => {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.user);
  const [input, setinput] = useState('');
  // const [isOnePerson, setMorePersons] = useState(-1);
  // const [groupName, setGroupName] = useState('');
  // const [groupList, setGroupList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setChatModal(!chatModal);
    setinput('');
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(name);
    if (name === 'email') {
      setinput(value);
      setModalInput(value);
    }
  };

  return (
    <div className='new-msg-container'>
      <div className='exit-wrapper'>
        <div className='exit'>
          <IconButton
            className={classes.iconButton}
            onClick={() => setChatModal(!chatModal)}
          >
            <div className='exit-button'>&times;</div>
          </IconButton>
        </div>
      </div>
      <div className='title-modal'>
        <h2>Start chatting</h2>
      </div>

      <div className='new-msg-modal'>
        <form onSubmit={handleSubmit}>
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
