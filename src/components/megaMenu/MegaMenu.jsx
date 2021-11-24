import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import { Avatar } from '@material-ui/core';
import profile from '../../assets/profile.jpg';
// import DriveFileRenameOutlineIcon from '@material-ui/icons/DriveFileRenameOutline';
// import ModeEditOutlineOutlinedIcon from '@material-ui/icons/ModeEditOutlineOutlined';
// import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
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

const MegaMenu = ({ clickMenu, setClickMenu }) => {
  const classes = useStyles();
  return (
    <div className={`mega-container ${clickMenu ? 'open' : ''}`}>
      <header className='mega-menu-header'>
        <div className='mega-menu-close-btn-header'>
          <IconButton
            className={classes.closeBtn}
            onClick={() => setClickMenu(!clickMenu)}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className='mega-menu-title-header'>
          <h2>User details:</h2>
        </div>
      </header>
      {/* <div className='mega-inner-container'>
        <div className='mega'>
          <div className='mega-img-name'>
            <div className='mega-img'>
              <IconButton>
                <Avatar className={classes.profileImg} src={profile} />
              </IconButton>
            </div>
            <div className='mega-name'>
              <div className='name-wrapper'>
                <h4>john due</h4>
              </div>
              <IconButton>
                <CreateIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <div className='mega-main'>
          <div className='mega-inner-main'>
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
      </div> */}
    </div>
  );
};

export default MegaMenu;
