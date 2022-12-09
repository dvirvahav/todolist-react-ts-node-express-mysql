import { FC, useState } from 'react';
import { useCurrentListContext } from '../../context/currentList';
import { useCurrentListIDContext } from '../../context/currentListID';

import { useCurrentTaskContext } from '../../context/currentTask';
import { useListContext } from '../../context/list';

export const InfoItem: FC<{ date: string; dueDate: string | null }> = ({
  date,
  dueDate,
}) => {
  const { currentTask } = useCurrentTaskContext();
  const { currentListID } = useCurrentListIDContext();
  const { lists } = useListContext();
  const { setCurrentList } = useCurrentListContext();
  const { setCurrentTask } = useCurrentTaskContext();
  const [buttonInput, setButtonInput] = useState<string>('Edit');
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const check = ` ${'dueDate:' + dueDate}`;

  const handleDueDate = () => {
    lists.forEach((item) => {
      if (item.listID === currentListID) {
        item.pendingTasks.forEach((taskItem) => {
          if (taskItem.taskID === currentTask.taskID) {
            taskItem.info.dueDate = '2018';
            setCurrentTask(taskItem);
          }
        });

        setCurrentList(item.pendingTasks.slice());
      }
    });
  };

  return (
    <ul>
      <li> {'Date:' + date}</li>
      <br></br>
      <li>
        {dueDate === null ? (
          <button onClick={handleDueDate}>Add due date</button>
        ) : (
          check
        )}
      </li>
    </ul>
  );
};
