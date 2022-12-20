import { FC } from 'react';
import { useCurrentTaskContext } from '../../context/currentTask';
import { CreationDate } from './dataComponents/CreationDate';
import { DueDate } from './dataComponents/dueDate/DueDate';
import { Hyperlink } from './dataComponents/hyperLink/Hyperlink';

export const InfoItem: FC = () => {
  const { currentTask } = useCurrentTaskContext();

  return (
    <ul className='pendingTaskList'>
      <CreationDate date={currentTask.info.date} />
      <DueDate />
      <Hyperlink />
    </ul>
  );
};
