import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutInitiate } from '../../redux/actions';
import './SignOut.css';

const SignOut = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleAuth = () => {
    if (currentUser) {
      dispatch(signOutInitiate());
    }
  };
  return (
    <div className='sign-out-wrapper'>
      <div className='sign-out' onClick={handleAuth}>
        SIGN OUT
      </div>
    </div>
  );
};

export default SignOut;
