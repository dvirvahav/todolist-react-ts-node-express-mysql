import { FC } from 'react';
import { useCurrentTaskContext } from '../../context/currentTask';
import { DateItem } from './dateItem';

export const InfoContainer: FC = () => {
  const { currentTask } = useCurrentTaskContext();

  return (
    <div className='infoContainer'>
      <h1 className='headline'>Info</h1>
      <div className='taskInfo'>
        <DateItem key={`${currentTask.taskID}`} date={currentTask.info.date} />
      </div>
    </div>
  );
};
