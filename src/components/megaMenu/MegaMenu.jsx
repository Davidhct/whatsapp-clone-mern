import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import CreateIcon from '@material-ui/icons/Create';
import { Avatar } from '@material-ui/core';
import profile from '../../assets/profile.jpg';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupDetails from '../groupDetails/GroupDetails';
import ContactDetails from '../contactDetails/ContactDetails';

import './MegaMenu.css';

const useStyles = makeStyles({
  profileImg: {
    width: '144px',
    height: '144px',
  },
  closeBtn: {
    backgroundColor: '#d4d4df',
  },
});

const MegaMenu = ({
  clickMenu,
  setClickMenu,
  currentChat,
  setChatModal,
  setGroupModal,
  setAddPerson,
}) => {
  const classes = useStyles();
  return (
    <div className={`mega-container ${clickMenu ? 'open' : ''}`}>
      <div className='mega-menu-header'>
        <IconButton
          className={classes.closeBtn}
          onClick={() => setClickMenu(!clickMenu)}
        >
          <CloseIcon />
        </IconButton>

        <div className='mega-menu-header-title'>
          {currentChat?.isGroup ? (
            <h2>Group details</h2>
          ) : (
            <h2>Contact details</h2>
          )}
        </div>
      </div>
      {currentChat?.isGroup ? (
        <GroupDetails
          currentChat={currentChat}
          setChatModal={setChatModal}
          setGroupModal={setGroupModal}
          setAddPerson={setAddPerson}
        />
      ) : (
        <ContactDetails currentChat={currentChat} />
      )}
    </div>
  );
};

export default MegaMenu;
