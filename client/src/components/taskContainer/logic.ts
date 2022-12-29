import Axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';

import { useCurrentListIDContext } from '../../context/currentListID';
import { useCurrentListContext } from '../../context/currentList';
import { useListContext } from '../../context/list';
import { info, task } from '../../types/types';

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
          let newTask: task = {} as task;
          lists.forEach((item: { listID: number; tasks: task[] }) => {
            if (item.listID === currentListID) {
              newTask = initiateNewTask(
                response.data[0]['id'],
                input,
                new Date().toLocaleString()
              );
              item.tasks.push(newTask);
            }
          });

          // Set the list as current list
          lists.forEach((item: { listID: number; tasks: task[] }) => {
            if (item.listID === currentListID) {
              setCurrentList(item.tasks.slice());
            }
          });
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
  ): task {
    const newInfoForTask: info = {
      date: date,
      dueDate: dueDate,
    };

    const newTaskItem: task = {
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
