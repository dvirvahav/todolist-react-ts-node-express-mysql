import './Home.css';
import { ListContainer } from '../../components/listContainer/listContainer';
import { TaskContainer } from '../../components/taskContainer/taskContainer';
import { InfoContainer } from '../../components/infoContainer/infoContainer';
import React, { FC } from 'react';
import { useCurrentTaskContext } from '../../context/currentTask';
import { Dashboard } from '../../components/dashboard/dashboard';
import { Status } from '../../components/status/statusContainer';

export const Home: FC = () => {
  const { isHidden } = useCurrentTaskContext();
  return (
    <div>
      <Dashboard />
      <div className={isHidden ? 'HomeNoTask' : 'Home'}>
        <ListContainer />
        <div>
          <Status />
          <TaskContainer />
        </div>

        <InfoContainer />
      </div>
    </div>
  );
};
