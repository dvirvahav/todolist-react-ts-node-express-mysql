import './Home.css';
import { ListContainer } from '../../components/listContainer/listContainer';
import { TaskContainer } from '../../components/taskContainer/taskContainer';
import { InfoContainer } from '../../components/infoContainer/infoContainer';
import React, { FC } from 'react';
import { NavBar } from '../../components/navigation/navbarContainer';
import { useCurrentTaskContext } from '../../context/currentTask';

export const Home: FC = () => {
  const { isHidden } = useCurrentTaskContext();
  return (
    <div>
      <NavBar />
      <div className={isHidden ? 'HomeNoTask' : 'Home'}>
        <ListContainer />
        <TaskContainer />
        <InfoContainer />
      </div>
    </div>
  );
};
