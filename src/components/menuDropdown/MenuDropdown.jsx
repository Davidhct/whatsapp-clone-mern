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
  setPerson,
  setChatModal,
  setGroupModal,

  // showModal,
}) => {
  const { currentUser } = useSelector((state) => state.user);

  const handleDeleteClick = async (event) => {
    event.preventDefault();
    try {
      await axios.patch('/api/v1/conversations/?chatId=' + currentChat?._id, {
        delId: currentUser.uid,
      });
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
    } else {
      setChatModal(true);
      setGroupModal(false);
      setPerson(true);
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
