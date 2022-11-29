import { ListItem } from './listItem';

import { ChangeEvent, useState, FormEvent, FC } from 'react';
import { listObject, taskObject } from '../../types/types';
import { useCurrentListContext } from '../../context/currentList';
import { useListContext } from '../../context/list';

import { useCurrentListIDContext } from '../../context/currentListID';
import Axios from 'axios';
import { useUserContext } from '../../context/user';

export const ListContainer: FC = () => {
  const [input, setInput] = useState<string>('');
  const { setCurrentList } = useCurrentListContext();
  const { lists, addNewList } = useListContext();
  const { setCurrentListID } = useCurrentListIDContext();
  const { profile } = useUserContext();

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    let newList: listObject = {} as listObject;

    Axios.post('/api/insertList', {
      listName: input,
      username: profile.username,
    }).then((response) => {
      if (response.data === 'Error') {
        alert('Something went wrong, list not saved in db');
      } else {
        setCurrentListID(response.data[0]['id']);
        newList = initiateNewList(response.data[0]['id'], input);
        setCurrentList(newList.pendingTasks);
        addNewList(newList);
      }
    });

    setInput('');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div className='listContainer'>
      <h1 className='headline'>Lists</h1>
      <ul className='categoryList'>
        <ul>
          {lists.map((item, idx) => (
            <ListItem
              key={`${item.listID}-${idx}`}
              itemInput={item.listName}
              itemID={item.listID}
              isActive={item.isActive}
            />
          ))}
        </ul>
      </ul>
      <form className='formAddList' onSubmit={handleSubmit}>
        <button>+</button>
        <input
          className='listInput'
          type='text'
          placeholder='Add a list'
          maxLength={20}
          value={input}
          onChange={handleChange}
          required
        />
      </form>
    </div>
  );
};

// This function help to create new list
export function initiateNewList(serial: number, input: string): listObject {
  let newListItem: listObject = {
    listID: serial,
    listName: input,
    completedTasks: [] as taskObject[],
    pendingTasks: [] as taskObject[],
    isActive: false,
  };

  return newListItem;
}
