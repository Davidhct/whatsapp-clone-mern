import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
// import ModeEditOutlineOutlinedIcon from '@material-ui/icons/ModeEditOutlineOutlined';
// import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import './MegaMenu.css';

const MegaMenu = ({ clickMenu }) => {
  return (
    <div className={`mega-container ${clickMenu ? 'open' : ''}`}>
      <div className='mega-inner-container'>
        <div className='mega-header'>
          <div className='mega-img-name'>
            <div className='mega-img'>
              <img src='' alt='' />
              <IconButton>
                <AddPhotoAlternateOutlinedIcon />
              </IconButton>
            </div>
            <div className='mega-name'>
              <h4>john due</h4>
              <IconButton>{/* <ModeEditOutlineOutlinedIcon /> */}</IconButton>
            </div>
          </div>
        </div>
        <div className='mega-main'>
          <div className='mega-friends-list'>
            <div className='mega-title'>
              <h2>Friends List:</h2>
            </div>
            <div className='mega-list'>
              <div className='mega-friend'>
                <IconButton>
                  <CloseIcon />
                </IconButton>
                <p>example@ex.ple</p>
              </div>
              <div className='mega-friend'>
                <IconButton>
                  <CloseIcon />
                </IconButton>
                <p>example@ex.ple</p>
              </div>
              <div className='mega-friend'>
                <IconButton>
                  <CloseIcon />
                </IconButton>
                <p>example@ex.ple</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
