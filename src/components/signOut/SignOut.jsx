import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutInitiate } from '../../redux/actions';
import './SignOut.css';

const SignOut = ({ uppercase = undefined }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleAuth = () => {
    if (currentUser) {
      dispatch(signOutInitiate());
    }
  };
  return (
    <div className={uppercase ? 'sign-out-upper' : 'sign-out-wrapper'}>
      <div className='sign-out-header'>
        <div
          className={uppercase ? 'sign-out-upper' : 'sign-out'}
          onClick={handleAuth}
        >
          Sign out
        </div>
      </div>
    </div>
  );
};

export default SignOut;
