import React from 'react';
import SignOut from '../signOut/SignOut';
import { useSelector } from 'react-redux';
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

  const handleDeleteClick = async (event) => {
    const users = [...currentChat?.userInfo];
    console.log(users);
    event.preventDefault();
    try {
      // await axios.patch('/api/v1/conversations/?chatId=' + currentChat?._id, {
      //   isGroup: currentChat?.isGroup,
      //   delId: currentUser.uid,
      //   userInfo: currentChat?.userInfo,
      // });
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
  console.log(currentChat);
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
              <div className='menu-list' onClick={handleDeleteClick}>
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
