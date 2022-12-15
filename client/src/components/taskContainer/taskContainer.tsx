import Axios from 'axios';
import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { useCurrentListIDContext } from '../../context/currentListID';
import { useCurrentListContext } from '../../context/currentList';
import { useListContext } from '../../context/list';
import { infoObject, taskObject } from '../../types/types';
import { TaskItem } from './taskItem';

export const TaskContainer: FC = () => {
  const { currentList, setCurrentList } = useCurrentListContext();
  const { currentListID } = useCurrentListIDContext();
  const { lists } = useListContext();
  const [input, setInput] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(() => {
      return event.target.value;
    });
  };

  const submit = (event: FormEvent): void => {
    event.preventDefault();

    Axios.post('/api/insertTask', {
      listID: currentListID,
      taskName: input,
    })
      .then((response) => {
        if (response.data === 'Error') {
          alert('Something went wrong, list not saved in db');
        } else {
          let newTask: taskObject = {} as taskObject;
          lists.forEach(
            (item: { listID: number; pendingTasks: taskObject[] }) => {
              if (item.listID === currentListID) {
                newTask = initiateNewTask(response.data[0]['id'], input);
                item.pendingTasks.push(newTask);
              }
            }
          );

          // Set the list as current list
          lists.forEach(
            (item: { listID: number; pendingTasks: taskObject[] }) => {
              if (item.listID === currentListID) {
                setCurrentList(item.pendingTasks.slice());
              }
            }
          );
        }
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setInput('');
      });
  };

  const handlePending = () => {};
  const handleCompleted = () => {};

  return (
    <div className='taskContainer'>
      <h6 className='headline'>Tasks</h6>
      <button onClick={handlePending}> Pending </button>
      <button onClick={handleCompleted}> Completed </button>
      <div className='allLists'>
        <ul className='pendingTaskList'>
          {currentList.map((item, idx) => (
            <TaskItem
              key={`${item.taskID}-${idx}`}
              itemInput={item.taskName}
              itemID={item.taskID}
              itemStatus={item.status}
            />
          ))}
        </ul>
      </div>
      <form className='formAdd' onSubmit={submit}>
        <button>+</button>
        <input
          className='taskInput'
          type='text'
          placeholder='Add a task'
          maxLength={90}
          value={input} // in order to clear it with setInputValue
          onChange={handleChange} // updating InputValue
          required
        />
      </form>
    </div>
  );
};

export function initiateNewTask(serial: number, input: string): taskObject {
  const newInfoForTask: infoObject = {
    date: new Date().toLocaleString(),
  };
  const newTaskItem: taskObject = {
    taskID: serial,
    taskName: input,
    info: newInfoForTask,
    status: 0,
  };

  return newTaskItem;
}
