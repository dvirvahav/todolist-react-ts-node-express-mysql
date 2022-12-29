import { ChangeEvent, useState, FormEvent } from 'react';
import Axios from 'axios';
import { list, task } from '../../types/types';
import { useGeneralLogic } from '../allContexts';

export const useListLogic = () => {
  const [input, setInput] = useState<string>('');
  const { setCurrentList, lists, addNewList, setCurrentListID, profile } =
    useGeneralLogic();

  function initiateNewList(serial: number, input: string): list {
    let newListItem: list = {
      listID: serial,
      listName: input,
      tasks: [] as task[],
      isActive: false,
    };

    return newListItem;
  }
  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    let newList: list = {} as list;

    Axios.post('/api/insertList', {
      listName: input,
      username: profile.username,
    })
      .then((response) => {
        if (response.data === 'Error') {
          alert('Something went wrong, list not saved in db');
        } else {
          setCurrentListID(response.data[0]['id']);
          newList = initiateNewList(response.data[0]['id'], input);
          setCurrentList(newList.tasks);
          addNewList(newList);
        }
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setInput('');
      });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return {
    handleChange,
    handleSubmit,
    lists,
    input,
    initiateNewList,
  };
};
