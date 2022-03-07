import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import FormInput from '../formInput/FormInput';
import CustomButton from '../customButton/CustomButton';
import axios from './../../axios';
import './SignIn.css';
import { googleSignInInitiate, signInInitiate } from '../../redux/actions';

const SignIn = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const { email, password } = state;

  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      history.push('/chat');
    }
  }, [currentUser, history]);

  const handleGoogleSignIn = () => {
    dispatch(googleSignInInitiate());
  };
  // update user in database
  useEffect(() => {
    const createUser = async () => {
      try {
        if (currentUser) {
          await axios.post('/api/v1/users/', {
            userid: currentUser.uid,
            username: currentUser.displayName,
            email: currentUser.email,
            profilePicture: currentUser.photoURL,
          });
        }
        // console.log(user);
      } catch (err) {
        console.error(err);
      }
    };
    createUser();
  }, [currentUser]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert('There in no email or password!'); // change to other alert
      return;
    }
    dispatch(signInInitiate(email, password));
    setState({ email: '', password: '' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
  };

  return (
    <div className='sign-in'>
      <div className='sign-in-container'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1920px-WhatsApp.svg.png'
          alt='whatsapp logo'
        />
        <div className='sign-in-text'>
          <h1>Sign in to WhatsApp clone</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <FormInput
            type='email'
            name='email'
            value={email}
            handleChange={handleChange}
            label='email'
            required
          />

          <FormInput
            type='password'
            name='password'
            value={password}
            handleChange={handleChange}
            label='password'
            required
          />
          <div className='buttons'>
            <div className='sign-in-button'>
              <CustomButton type='submit'>Sign in</CustomButton>
            </div>
            <div className='line'>
              <div className='line-1'></div>
              <p>OR</p>
              <div className='line-2'></div>
            </div>
            <div className='sign-in-google-button'>
              <CustomButton onClick={handleGoogleSignIn} isGoogleSignIn>
                Sign in with Google
              </CustomButton>
            </div>
          </div>
          <div className='to-sign-up'>
            <p>Don't have an account?</p>
            <Link className='link-sign-up' to='/signUp'>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
