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
  // const [isOnePerson, setMorePersons] = useState(-1);
  // const [groupName, setGroupName] = useState('');
  // const [groupList, setGroupList] = useState([]);

  // const reconnectMember = async (user) => {
  //   try {
  //     await axios.patch('/api/v1/conversations/?chatId=' + user._id, {
  //       reconnect: true,
  //       members: [currentUser.uid],
  //     });
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };
  // const addNewMember = async (user) => {
  //   console.log(user);
  //   try {
  //     const res = await axios.patch(
  //       '/api/v1/conversations/?chatId=' + currentChat?._id,
  //       {
  //         addPerson: true,
  //         members: [user.userid],
  //         userInfo: [user],
  //       }
  //     );
  //     console.log(res.data);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };
  // const deleteMember = async (user) => {
  //   try {
  //     await axios.delete('/api/v1/conversations/' + user._id);
  //     // console.log(res.data);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };
  // const checkGetUser = async () => {
  //   let data;
  //   try {
  //     const res = await axios.put('/api/v1/users/', {
  //       group: false,
  //       friendsList: input,
  //     });
  //     data = res?.data;
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  //   return data;
  // };

  // const handleChatSubmit = (event) => {
  //   event.preventDefault();

  //   const getUser = async () => {
  //     // let addPerson = undefined;
  //     try {
  //       const resUser = await checkGetUser();
  //       console.log(resUser);
  //       if (resUser?.length > 0) {
  //         const resPrv = await axios.get('/api/v1/conversations/');
  //         // console.log(resPrv?.data);
  //         const convePrv = resPrv?.data.data;
  //         if (convePrv.length > 0) {
  //           for (let i = 0; i < convePrv.length; i++) {
  //             if (convePrv[i].members.length === 1) {
  //               console.log(resUser[0].userid);
  //               if (convePrv[i].members[0] === resUser[0].userid) {
  //                 console.log(convePrv);
  //                 // addPerson = convePrv[i];
  //                 await reconnectMember(convePrv[i]);
  //                 // setMorePersons(2);
  //                 return;
  //               } else if (convePrv[i].members[0] === currentUser.uid) {
  //                 // addPerson = convePrv[i];
  //                 deleteMember(convePrv[i]);
  //                 // setMorePersons(0);
  //                 break;
  //               }
  //             }

  //             if (i === convePrv.length - 1) {
  //               const res = await createFreindship(false, resUser);
  //               console.log('from chat: ', res);
  //             }
  //           }
  //         } else {
  //           const res = await createFreindship(false, resUser);
  //           console.log('from chat: ', res);
  //         }
  //       }
  //       //joun@example.com
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   };
  //   if (addPerson === true) {
  //     const addUser = async () => {
  //       try {
  //         const resUser = await checkGetUser();
  //         await addNewMember(resUser[0]);
  //         console.log(resUser);
  //       } catch (err) {
  //         console.error(err.message);
  //       }
  //     };
  //     addUser();
  //   } else {
  //     getUser();
  //   }
  //   setPerson(false);
  //   setGroupModal(!groupModal);
  //   setinput('');

  //   // console.log(conversation);
  // };
  const createFreindship = async (data) => {
    console.log('data: ', data.username);
    const res = await axios.post('/api/v1/conversations/', {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setChatModal(!chatModal);
    let resUser;
    const getUser = async () => {
      try {
        // check if the user is in the database
        resUser = await axios.put('/api/v1/users/', {
          group: false,
          friendsList: input,
        });
        console.log(resUser?.data);
        if (!addPerson && resUser?.data.length > 0) {
          // get all conversation
          const resConvers = await axios.get('/api/v1/conversations/');
          console.log(resConvers?.data.data);
          const convers = resConvers?.data.data;
          if (convers.length > 0) {
            console.log(convers);
            for (let i = 0; i < convers.length; i++) {
              if (!convers[i].isGroup && convers[i].members.length === 1) {
                // console.log(convers);
                const friend = convers[i].userInfo.find(
                  (usr) => usr.userid !== input
                );
                // connct to old conversation
                friend &&
                  (await axios.patch(
                    '/api/v1/conversations/?chatId=' + convers[i]._id,
                    {
                      reconnect: true,
                      members: [currentUser.uid],
                    }
                  ));
                return;
              } else if (i === convers.length - 1) {
                createFreindship(resUser?.data);
                return;
              }
            }
          }
        } else if (addPerson) {
          console.log('dddddd', resUser?.data[0].userid);
          console.log('dddddd', resUser?.data);
          await axios.patch(
            '/api/v1/conversations/?chatId=' + currentChat?._id,
            {
              addPerson: true,
              members: [resUser?.data[0].userid],
              userInfo: [...resUser?.data],
            }
          );
          setAddPerson(false);
          return;
        } else {
          createFreindship(resUser?.data);
          return;
        }

        //     //joun@example.com
      } catch (err) {
        console.error(err.message);
      }
    };

    // if (addPerson === true) {
    //   const addUser = async () => {
    //     try {
    //       const resUser = await checkGetUser();
    //       await addNewMember(resUser[0]);
    //       console.log(resUser);
    //     } catch (err) {
    //       console.error(err.message);
    //     }
    //   };
    //   addUser();
    // } else {
    //   getUser();
    // }
    getUser();
    // setPerson(false);

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
