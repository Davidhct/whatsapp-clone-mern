import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import FormInput from '../formInput/FormInput';
import CustomButton from '../customButton/CustomButton';
import axios from './../../axios';
import './SignUp.css';
import { signUpInitiate } from '../../redux/actions';

const SignUp = () => {
  const [state, setState] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { displayName, email, password, confirmPassword } = state;

  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      history.push('/chat');
    }
  }, [currentUser, history]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("password don't match"); // change to other alert
      return;
    }
    dispatch(signUpInitiate(displayName, email, password));
    setState({ displayName: '', email: '', password: '', confirmPassword: '' });
  };

  // update user in database
  useEffect(() => {
    const createUser = async () => {
      try {
        await axios.post('/api/v1/users', {
          userid: currentUser.uid,
          username: currentUser.displayName,
          email: currentUser.email,
          profilePicture: currentUser.photoURL,
        });
        // setConversations(res.data);
        // console.log(user);
      } catch (err) {
        console.error(err);
      }
    };
    createUser();
  }, [currentUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
  };

  return (
    <div className='sign-up'>
      <div className='sign-up-container'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1920px-WhatsApp.svg.png'
          alt='whatsapp logo'
        />
        <div className='sign-up-text'>
          <h1>Sign up to WhatsApp clone</h1>
        </div>
        <form className='sign-up-form' onSubmit={handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
            label='confirmPassword'
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'>Sign up</CustomButton>
          </div>
          <div className='to-sign-in'>
            <p>Already have an account?</p>
            <Link className='link-sign-in' to='/signIn'>
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
