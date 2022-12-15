import { FC } from 'react';
import { useCurrentTaskContext } from '../../context/currentTask';
import { InfoItem } from './infoItem';

export const InfoContainer: FC = () => {
  const { currentTask } = useCurrentTaskContext();

  return currentTask.info.date === '' ? (
    <div className='empty-container'></div>
  ) : (
    <div className='infoContainer'>
      {currentTask ? (
        <InfoItem
          key={currentTask.taskID}
          date={currentTask.info.date}
          dueDate={currentTask.info.dueDate}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
