import Axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';

import { useCurrentListIDContext } from '../../context/currentListID';
import { useCurrentListContext } from '../../context/currentList';
import { useListContext } from '../../context/list';
import { infoObject, taskObject } from '../../types/types';

export const useTaskLogic = () => {
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
                newTask = initiateNewTask(
                  response.data[0]['id'],
                  input,
                  new Date().toLocaleString()
                );
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

  function initiateNewTask(
    id: number,
    input: string,
    date: string,
    dueDate?: string
  ): taskObject {
    const newInfoForTask: infoObject = {
      date: date,
      dueDate: dueDate,
    };

    const newTaskItem: taskObject = {
      taskID: id,
      taskName: input,
      info: newInfoForTask,
      status: 0,
      isActive: false,
    };

    return newTaskItem;
  }

  return {
    lists,
    currentListID,
    currentList,
    submit,
    handleChange,
    input,
    initiateNewTask,
  };
};
