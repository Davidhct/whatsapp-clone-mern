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
      let flag = true;
      let addPerson = undefined;
      try {
        const resUser = await axios.get('/api/v1/users/' + input);
        console.log(currentUser);
        if (resUser?.data !== '') {
          const resPrv = await axios.get('/api/v1/private');
          console.log(resPrv?.data);
          const convePrv = resPrv?.data.data;
          convePrv.map((cp) => {
            if (cp.members.length === 1) {
              // console.log(cp);
              if (cp.members[0] === resUser?.data.userid) {
                console.log(cp);
                addPerson = cp;

                flag = false;
                return;
              }
            }
            // console.log(res?.data);
          });
        }
        if (addPerson !== undefined) {
          console.log(addPerson);
          const res = await axios.patch(
            '/api/v1/private/?chatId=' + addPerson._id,
            {
              members: [currentUser.uid],
            }
          );
        }
        //joun@example.com
        // if (resUser?.data !== '' && flag) {
        //   const res = await axios.post('/api/v1/private/', {
        //     members: [currentUser.uid, resUser?.data.userid],
        //     userInfo: [
        //       {
        //         userid: currentUser.uid,
        //         username: currentUser.displayName,
        //         profilePicture: currentUser.photoURL,
        //       },
        //       {
        //         userid: resUser?.data.userid,
        //         username: resUser?.data.username,
        //         profilePicture: resUser?.data.profilePicture,
        //       },
        //     ],
        //     messages: [{ sender: null, text: null, isRead: false }],
        //   });
        // }
        // console.log(resUser?.data);
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
        <IconButton
          className={classes.iconButton}
          onClick={() => setModal(!showModal)}
        >
          <div className='exit-button'>&times;</div>
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
