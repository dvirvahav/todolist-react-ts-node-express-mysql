import { FC } from 'react';
import { useCurrentTaskContext } from '../../context/currentTask';
import { InfoItem } from './infoItem';

export const InfoContainer: FC = () => {
  const { currentTask } = useCurrentTaskContext();

  return (
    <div className='infoContainer'>
      <h1 className='headline'>Info</h1>
      <div className='taskInfo'>
        {
          <InfoItem
            key={`${currentTask.taskID}`}
            date={currentTask.info.date}
            dueDate={currentTask.info.dueDate}
          />
        }
      </div>
    </div>
  );
};
