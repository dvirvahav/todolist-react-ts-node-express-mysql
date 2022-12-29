import { ChangeEvent, FC, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Axios, { AxiosResponse } from 'axios';
import { useUserContext } from '../../context/user';
import { list, user } from '../../types/types';
import { IoIosLogIn } from 'react-icons/io';
import { useListContext } from '../../context/list';
import { useCurrentListContext } from '../../context/currentList';
import { alerts } from '../../utils/enums';
import { useListLogic } from '../../components/listContainer/logic';
import { useTaskLogic } from '../../components/taskContainer/logic';

export const Login: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setUserProfile: setUser } = useUserContext();
  const { reloadNewList, clearList } = useListContext();
  const { clearCurrentList } = useCurrentListContext();
  const { initiateNewList } = useListLogic();
  const { initiateNewTask } = useTaskLogic();
  const navigate: NavigateFunction = useNavigate();

  const handleUserChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(() => {
      return event.target.value;
    });
  };
  const handlePassChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(() => {
      return event.target.value;
    });
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    Axios.post('/api/login', {
      username: username,
      password: password,
    })
      .then((response) => {
        if (response.data === 'Error') {
          alert(alerts.login);
        } else {
          console.log(response);
          updateUserDetails(response);
          Axios.post('/api/getAllData', { username: username })
            .then((response) => {
              if (response.data === 'Error') {
                alert(alerts.db);
              } else {
                clearData();
                loadData(response);
              }
            })
            .catch(() => {
              alert(alerts.connection);
            });

          navigate('/home');
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleSignup = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate('/signup');
  };

  const clearData = () => {
    clearCurrentList();
    clearList();
  };

  const updateUserDetails = (response: AxiosResponse) => {
    const user: user = {} as user;
    user.username = response.data[0]['username'];
    user.first = response.data[0]['first'];
    user.last = response.data[0]['last'];
    user.mail = response.data[0]['mail'];
    setUser(user);
  };

  const loadData = (response: AxiosResponse) => {
    const userLists: list[] = [];
    var i,
      j = 0;
    for (i = 0; i < response.data[0].length; i++) {
      let currentListID = response.data[0][i]['id'];
      let newList: list = initiateNewList(
        currentListID,
        response.data[0][i]['name']
      );
      userLists.push(newList);
      for (j = 0; j < response.data[1].length; j++) {
        if (response.data[1][j]['listID'] === currentListID) {
          let newTask = initiateNewTask(
            response.data[1][j]['taskID'],
            response.data[1][j]['taskName'],
            response.data[1][j]['date'],
            response.data[1][j]['dueDate'] === null
              ? undefined
              : response.data[1][j]['dueDate']
          );

          if (response.data[1][j]['status']) userLists[i].tasks.push(newTask);
          else userLists[i].tasks.push(newTask);
        }
      }
    }
    reloadNewList(userLists);
  };

  return (
    <div className='login-body grid-container loading-normal '>
      <div className='img-wrapper grid-item'>
        <img
          src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
          alt=''></img>
      </div>

      <div className='login-wrapper loading-slow'>
        <div className='top-login-form'>
          <IoIosLogIn size='40px' color='#1976d2' />
          <h1>Log in to Your Account</h1>
        </div>

        <form id='login-form' method='post' onSubmit={handleSubmit}>
          <input
            id='username'
            type='text'
            name='username'
            placeholder='Username'
            required
            value={username}
            onChange={handleUserChange}
            autoComplete='username'
            maxLength={40}
          />
          <br /> <br />
          <input
            maxLength={40}
            id='password'
            type='password'
            name='password'
            placeholder='Password'
            required
            value={password}
            onChange={handlePassChange}
            autoComplete='current-password'
          />
          <br /> <br />
          <input id='login-button' type='submit' value='Login' />
          <div className='grid-item'>
            <p>
              Need an account?{' '}
              <a href='/public/Signup.html' onClick={handleSignup}>
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
