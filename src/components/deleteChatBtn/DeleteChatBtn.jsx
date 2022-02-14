import React from 'react';
import Swal from 'sweetalert2';
import { IconButton, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSelector } from 'react-redux';
import axios from '../../axios';
import './DeleteChatBtn.css';

const useStyles = makeStyles({
  deleteChat: {
    color: 'red',
  },
});
const DeleteChatBtn = ({ currentChat }) => {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.user);

  const beforeDeleteChat = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete chat',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteChat();
      }
    });
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

  return (
    <div className='delete-chat-container'>
      <div className='delete-chat-title'>
        <IconButton className={classes.deleteChat} onClick={beforeDeleteChat}>
          <DeleteIcon />
        </IconButton>

        <p>Delete chat</p>
      </div>
    </div>
  );
};

export default DeleteChatBtn;
