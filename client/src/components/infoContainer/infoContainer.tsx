import { FC } from 'react';
import { useCurrentTaskContext } from '../../context/currentTask';
import { InfoItem } from './infoItem';

export const InfoContainer: FC = () => {
  const { currentTask } = useCurrentTaskContext();

  return (
    <div className='infoContainer'>
      <h6 className='headline'>Task Info</h6>

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
