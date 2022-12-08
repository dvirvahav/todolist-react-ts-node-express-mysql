import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import React, { FC } from 'react';
import { Login } from '../login/Login';
import { Signup } from '../signup/Signup';
import { Home } from '../home/Home';
import { CurrentTaskContextProvider } from '../../context/currentTask';
import { ListContextProvider } from '../../context/list';
import { CurrentListContextProvider } from '../../context/currentList';
import { CurrentListIDContextProvider } from '../../context/currentListID';
import { UserContextProvider } from '../../context/user';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <nav>
          {/* <Link to='/home'>
            <input type='text' className='nav-bar-item' value='Home' readOnly />
          </Link> */}
          <Link to='/login'>
            <input
              type='text'
              className='nav-bar-item'
              value='Login'
              readOnly
            />
          </Link>
          <Link to='/signup'>
            <input
              type='text'
              className='nav-bar-item'
              value='Register'
              readOnly
            />
          </Link>
        </nav>

        <CurrentListContextProvider>
          <CurrentListIDContextProvider>
            <CurrentTaskContextProvider>
              <UserContextProvider>
                <ListContextProvider>
                  <Routes>
                    <Route index element={<Login />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/signup' element={<Signup />} />
                  </Routes>
                </ListContextProvider>
              </UserContextProvider>
            </CurrentTaskContextProvider>
          </CurrentListIDContextProvider>
        </CurrentListContextProvider>
      </div>
    </BrowserRouter>
  );
};
