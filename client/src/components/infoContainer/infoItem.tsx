import { FC } from 'react';
import { useCurrentListContext } from '../../context/currentList';
import { useCurrentListIDContext } from '../../context/currentListID';

import { useCurrentTaskContext } from '../../context/currentTask';
import { useListContext } from '../../context/list';

export const InfoItem: FC<{ date: string; dueDate?: string }> = ({
  date,
  dueDate,
}) => {
  const { currentTask } = useCurrentTaskContext();
  const { currentListID } = useCurrentListIDContext();
  const { lists } = useListContext();
  const { setCurrentList } = useCurrentListContext();
  const { setCurrentTask } = useCurrentTaskContext();

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

  return date === '' ? (
    <ul className='pendingTaskList'></ul>
  ) : (
    <ul className='pendingTaskList'>
      <li className='taskItem item'> {'Date:' + date}</li>
      <br></br>
      <li className='taskItem item'>
        {currentTask.info.dueDate === undefined ? (
          <button onClick={handleDueDate}>Add due date</button>
        ) : (
          <li>
            <input type='text' size={90} maxLength={90} />
            <div className='buttonsGrid'>
              <button>Edit</button>
              <button>Remove</button>
            </div>
          </li>
        )}
      </li>
    </ul>
  );
};
