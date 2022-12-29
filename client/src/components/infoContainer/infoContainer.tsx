import { useGeneralLogic } from '../allContexts';
import { InfoItem } from './infoItem';
import { FC } from 'react';

export const InfoContainer: FC = () => {
  const { currentTask, currentList } = useGeneralLogic();

  return currentTask.info.date === '' ? (
    <div className='empty-container'></div>
  ) : (
    <div className='infoContainer'>
      {currentList.map((item) =>
        item.taskID === currentTask.taskID ? (
          <InfoItem key={currentTask.taskID} />
        ) : null
      )}
    </div>
  );
};
