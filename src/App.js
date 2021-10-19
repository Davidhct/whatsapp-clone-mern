import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Chat from './components/chat/Chat';
import SignIn from './components/signIn/SignIn';
import SignUp from './components/signUp/SignUp';
import { auth } from './firebaseUtils';
import axios from './axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/actions';

const App = () => {
  // const [state, setState] = useState({
  //   email: '',
  //   password: '',
  // });
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  // const [user, setCurrentUser] = useState([]);

  // console.log(currentUser.uid);
  useEffect(() => {
    const updateUser = async () => {
      try {
        const res = await axios.post('/api/v1/users', {
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
    updateUser();
  }, [currentUser]);

  useEffect(() => {}, [currentUser]);

  // console.log(currentUser);
  return (
    <div className='App'>
      <Switch>
        <Redirect exact from='/' to='/signIn' />

        <Route
          exact
          path='/chat'
          render={() =>
            currentUser ? (
              <Redirect exact from='/' to='/chat' /> && (
                <Route path='/chat' component={Chat} />
              )
            ) : (
              <Redirect exact from='/' to='/signIn' />
            )
          }
        />

        <Route path='/signIn' component={SignIn} />
        <Route path='/signUp' component={SignUp} />
      </Switch>
    </div>
  );
};

export default App;
