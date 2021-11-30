import React, { useState } from 'react';

import { IconButton, Avatar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import './GroupParticipant.css';

const GroupParticipant = ({ userInfo, isAdmin, adminFeatures }) => {
  const [seeInfo, setSeeInfo] = useState(false);

  return (
    <div className={`groupPart-friend ${seeInfo ? 'toSeeInfo' : ''}`}>
      <div className='groupPart-friend-top'>
        <div className='groupPart-friend-left'>
          {adminFeatures ? (
            <IconButton>
              <CloseIcon />
            </IconButton>
          ) : null}

          <p className='groupPart-friend-name'>{userInfo.username}</p>
        </div>
        <div className='groupPart-friend-right'>
          {isAdmin ? <p className='groupPart-manager'>manager</p> : null}
          <IconButton onClick={() => setSeeInfo(!seeInfo)}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
      </div>
      <div className={seeInfo ? 'groupPart-info' : 'hidden'}>
        <Avatar src={userInfo.profilePicture} />
        <p className='groupPart-email'>example@nail.com</p>
      </div>
    </div>
  );
};

export default GroupParticipant;
