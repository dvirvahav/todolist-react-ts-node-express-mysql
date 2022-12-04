import { FC } from 'react';
import { useCurrentTaskContext } from '../../context/currentTask';

export const InfoItem: FC<{ date: string; dueDate: string | null }> = ({
  date,
  dueDate,
}) => {
  const { currentTask, setCurrentTask } = useCurrentTaskContext();
  const check = ` <li> ${'dueDate:' + dueDate}</li>`;
  const handleDueDate = () => {
    currentTask.info.dueDate = '2018';
  };
  return (
    <ul>
      <li> {'Date:' + date}</li>
      <br></br>
      {dueDate === null ? (
        <button onClick={handleDueDate}>Add due date</button>
      ) : (
        check
      )}
    </ul>
  );
};
