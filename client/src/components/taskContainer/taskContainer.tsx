import { FC, useEffect, useState } from 'react';
import { useTaskLogic } from './logic';
import { TaskForm } from './taskForm';
import { TaskItem } from './taskItem';

export const TaskContainer: FC = () => {
  const { currentList } = useTaskLogic();

  return (
    <div>
      <br />
      <ul className='tasksList loading-normal '>
        {currentList.map((item) => (
          <TaskItem
            key={item.taskID}
            itemInput={item.taskName}
            itemID={item.taskID}
            itemStatus={item.status}
            isActive={item.isActive}
          />
        ))}
      </ul>

      <TaskForm />
    </div>
  );
};
