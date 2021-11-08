import React, { useState, useEffect } from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';

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
});

const NewMessageModal = ({ setModal, showModal, isGroup, setGroup }) => {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.user);
  const [input, setinput] = useState('');
  const [isOnePerson, setMorePersons] = useState(-1);
  const [renderInput, setRenderInput] = useState([]);
  const [inputId, setInputId] = useState(0);
  const [groupInput, setGroupInput] = useState(['']);

  const handleChatSubmit = (event) => {
    event.preventDefault();

    const getUser = async () => {
      // let flag = true;
      let addPerson = undefined;
      try {
        const resUser = await axios.get('/api/v1/users/' + input);
        console.log(currentUser);
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
    // setGroup(false);
  };

  const handleChange = (event) => {
    event.preventDefault();

    console.log(event.target);
    setinput(event.target.value);
    if (isGroup === true) {
      // let tmp = groupInput[event.target.id] + input;
      console.log(event.target.value);
      // setGroupInput(tmp);
    }
  };

  const renderFormatInput = () => {
    setInputId(inputId + 1);
    setRenderInput([
      ...renderInput,
      <FormInput
        id={inputId}
        type='email'
        name='email'
        label='email'
        value={groupInput[inputId]}
        handleChange={handleChange}
      />,
    ]);
  };
  console.log(isGroup);
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
      <div>
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
            <div className='new-msg-input new-group-msg-input'>
              <FormInput
                id={inputId}
                type='email'
                name='email'
                label='email'
                value={groupInput[inputId]}
                handleChange={handleChange}
              />
              {renderInput}
            </div>
            <div className='new-msg-button new-group-msg-button'>
              <CustomButton type='submit'>Add</CustomButton>
              <IconButton
                className={classes.addGroupBtn}
                onClick={() => renderFormatInput()}
              >
                <GroupAddRoundedIcon />
              </IconButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default NewMessageModal;
