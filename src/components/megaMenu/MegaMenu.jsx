import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import { Avatar } from '@material-ui/core';
import profile from '../../assets/profile.jpg';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import './MegaMenu.css';

const useStyles = makeStyles({
  profileImg: {
    width: '144px',
    height: '144px',
  },
  closeBtn: {
    backgroundColor: '#d4d4df',
  },
  createI: {
    height: '60%',
    width: '20%',
  },
});

const MegaMenu = ({ clickMenu, setClickMenu }) => {
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
          <h2>Group details:</h2>
        </div>
      </div>
      <div className='mega-menu-inner-container'>
        <div className='mega-menu-profile'>
          <div className='mega-menu-img'>
            <IconButton>
              <Avatar className={classes.profileImg} src={profile} />
            </IconButton>
          </div>
          <div className='mega-menu-name-container'>
            <p className='mega-menu-name'>Name of the group</p>

            {/*
             if  is he an admin
             */}
            <IconButton className={classes.createI}>
              <CreateIcon />
            </IconButton>
          </div>
        </div>
        <div className='mega-menu-files-container'>
          <div className='mega-menu-title'>
            <p>Fils</p>
            <IconButton>
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
          <div></div>
        </div>
        <div className='mega-menu-friends-list'>
          <div className='mega-menu-title-friends-list'>
            <p>Friends List:</p>
            <p>22 Partcipants</p>
          </div>
          <div className='mega-menu-add-person'>
            <IconButton>
              <PersonAddIcon />
            </IconButton>
            <p>Adding participants</p>
          </div>

          <div className='mega-menu-list'>
            <div className='mega-menu-friend'>
              <div className='mega-menu-friend-left'>
                <IconButton>
                  <CloseIcon />
                </IconButton>
                <p className='mega-menu-friend-name'>User Name</p>
              </div>
              <p className='mega-menu-manager'>manager</p>
            </div>
            <div className='mega-menu-friend'>
              <div className='mega-menu-friend-left'>
                <IconButton>
                  <CloseIcon />
                </IconButton>
                <p className='mega-menu-friend-name'>User Name</p>
              </div>
              <p className='mega-menu-manager'>manager</p>
            </div>
            <div className='mega-menu-friend'>
              <div className='mega-menu-friend-left'>
                <IconButton>
                  <CloseIcon />
                </IconButton>
                <p className='mega-menu-friend-name'>User Name</p>
              </div>
            </div>
            <div className='mega-menu-friend'>
              <div className='mega-menu-friend-left'>
                <IconButton>
                  <CloseIcon />
                </IconButton>
                <p className='mega-menu-friend-name'>User Name</p>
              </div>
            </div>
            <div className='mega-menu-friend'>
              <div className='mega-menu-friend-left'>
                <IconButton>
                  <CloseIcon />
                </IconButton>
                <p className='mega-menu-friend-name'>User Name</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
