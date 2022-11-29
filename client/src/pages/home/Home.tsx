import './Home.css';
import { ListContainer } from '../../components/listContainer/listContainer';
import { TaskContainer } from '../../components/taskContainer/taskContainer';
import { InfoContainer } from '../../components/infoContainer/infoContainer';
import React, { FC } from 'react';

const Home: FC = () => {
  return (
    <div className='Home'>
      <ListContainer />
      <TaskContainer />
      <InfoContainer />
    </div>
  );
};

export default Home;
