import React from 'react';
import SignOut from '../signOut/SignOut';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from '../../axios';
import './MenuDropdown.css';

const MenuDropdown = ({
  // setModal,
  chatGroup,
  currentChat,
  isSidebar,
  setAddPerson,
  setChatModal,
  setGroupModal,

  // showModal,
}) => {
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
        handleDeleteClick();
      }
    });
  };

  const handleDeleteClick = async () => {
    let user;
    try {
      await axios.patch('/api/v1/members/?chatId=' + currentChat?._id, {
        deleteMemberId: currentUser.uid,
      });

      if (currentChat?.isGroup) {
        currentChat?.userInfo.forEach((info) => {
          if (info.userid === currentUser.uid) {
            user = info;
          }
        });
        const { userid, username, profilePicture, useremail } = { ...user };
        await axios.patch('/api/v1/userInfo/?chatId=' + currentChat?._id, {
          deleteUserInfo: { userid, username, profilePicture, useremail },
        });
      }
      // console.log(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();

    console.log(event.target.id);
    if (event.target.id === 'group') {
      setGroupModal(true);
      setChatModal(false);
    } else if (event.target.id === 'private') {
      setChatModal(true);
      setGroupModal(false);
    } else if (event.target.id === 'addPerson') {
      setChatModal(true);
      setGroupModal(false);
      setAddPerson(true);
    }
  };

  return (
    <div className='menu-dropdown'>
      {isSidebar ? (
        <div className='menu-items'>
          <ul>
            <li>
              <div className='menu-list' id='group' onClick={handleClick}>
                New group
              </div>
            </li>
            <li>
              <div className='menu-list' id='private' onClick={handleClick}>
                New chat
              </div>
            </li>
            <li>
              <div className='menu-list'>
                <SignOut />
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <div className='menu-items'>
          <ul>
            <li className={chatGroup ? '' : 'hidden'}>
              <div className='menu-list' id='addPerson' onClick={handleClick}>
                Add person
              </div>
            </li>
            <li>
              <div
                className={!chatGroup ? 'delete' : 'menu-list'}
                onClick={beforeDeleteChat}
              >
                Delete chat
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
