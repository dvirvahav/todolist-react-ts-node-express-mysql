import { ChangeEvent, FC, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Axios, { AxiosResponse } from 'axios';
import { useUserContext } from '../../context/user';
import { listObject, userObject } from '../../types/types';

import { initiateNewTask } from '../../components/taskContainer/taskContainer';
import { useListContext } from '../../context/list';
import { useCurrentListContext } from '../../context/currentList';
import { alerts } from '../../utils/enums';
import { useListLogic } from '../../components/listContainer/logic';

export const Login: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setUser } = useUserContext();
  const { reloadNewList, clearList } = useListContext();
  const { clearCurrentList } = useCurrentListContext();
  const { initiateNewList } = useListLogic();
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
    const user: userObject = {} as userObject;
    user.username = response.data[0]['username'];
    user.first = response.data[0]['first'];
    user.last = response.data[0]['last'];
    user.mail = response.data[0]['mail'];
    setUser(user);
  };

  const loadData = (response: AxiosResponse) => {
    const userLists: listObject[] = [];
    var i,
      j = 0;
    for (i = 0; i < response.data[0].length; i++) {
      let currentListID = response.data[0][i]['id'];
      let newList: listObject = initiateNewList(
        currentListID,
        response.data[0][i]['name']
      );
      userLists.push(newList);
      for (j = 0; j < response.data[1].length; j++) {
        if (response.data[1][j]['listID'] === currentListID) {
          let newTask = initiateNewTask(
            response.data[1][j]['taskID'],
            response.data[1][j]['taskName']
          );
          newTask.info.date = response.data[1][j]['date'];
          if (response.data[1][j]['status'])
            userLists[i].completedTasks.push(newTask);
          else userLists[i].pendingTasks.push(newTask);
        }
      }
    }
    reloadNewList(userLists);
  };

  return (
    <div className='Login-body'>
      <div className='Login'>
        <h1>Log in to Your Account</h1>
        <form method='post' onSubmit={handleSubmit}>
          <input
            className='Login-input'
            type='text'
            name='username'
            placeholder='Username'
            required
            value={username}
            onChange={handleUserChange}
            autoComplete='username'
          />
          <br />
          <input
            className='Login-input'
            type='password'
            name='password'
            placeholder='Password'
            required
            value={password}
            onChange={handlePassChange}
            autoComplete='current-password'
          />
          <br />
          <br />
          <input type='submit' className='Login-button' value='Login' />

          <br />
          <br />
          <br />
          <p>
            Need an account?{' '}
            <a href='/public/Signup.html' onClick={handleSignup}>
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
