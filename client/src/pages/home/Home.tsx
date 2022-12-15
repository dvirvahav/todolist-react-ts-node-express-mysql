import './Home.css';
import { ListContainer } from '../../components/listContainer/listContainer';
import { TaskContainer } from '../../components/taskContainer/taskContainer';
import { InfoContainer } from '../../components/infoContainer/infoContainer';
import React, { FC } from 'react';
import { NavBar } from '../../components/navigation/navbarContainer';

export const Home: FC = () => {
  return (
    <div>
      <NavBar />
      <div className='Home'>
        <ListContainer />
        <TaskContainer />
        <InfoContainer />
      </div>
    </div>
  );
};
