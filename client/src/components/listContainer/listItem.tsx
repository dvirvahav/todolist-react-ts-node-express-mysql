import Axios from 'axios';
import { FC, useState } from 'react';
import { FcDatabase } from 'react-icons/fc';
import { taskTemp } from '../../context/currentTask';

import { task } from '../../types/types';
import { useGeneralLogic } from '../allContexts';

export const ListItem: FC<{
  itemInput: string;
  itemID: number;
  isActive: boolean;
}> = ({ itemInput, itemID, isActive }) => {
  const {
    lists,
    removeItem,
    setIsHidden,
    setCurrentTask,
    setActiveItem,
    setCurrentList,
    updateListName,
    setCurrentListID,
  } = useGeneralLogic();

  const [buttonInput, setButtonInput] = useState<string>('Edit');
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [input, setInput] = useState<string>(itemInput);

  const handleSetList = () => {
    setIsHidden(true);
    setCurrentListID(itemID);
    setCurrentTask(taskTemp);
    lists.forEach(
      (item: { listID: number; tasks: task[]; isActive: boolean }) => {
        if (item.listID === itemID) {
          setActiveItem(item.listID);
          setCurrentList(item.tasks);
        }
      }
    );
  };

  const handleRemove = () => {
    Axios.post('/api/removeList', {
      listID: itemID,
    })
      .then((response) => {
        if (response.data === 'Error') {
          alert('Something went wrong, list not deleted');
        } else {
          removeItem(itemID);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleSave = () => {
    setReadOnly(() => {
      return !readOnly;
    });
    if (readOnly) {
      setButtonInput(() => {
        return 'Save';
      });
      return;
    } else
      setButtonInput(() => {
        return 'Edit';
      });
    Axios.post('/api/updateList', {
      listID: itemID,
      newName: input,
    })
      .then((response) => {
        if (response.data === 'Error') {
          alert('Something went wrong, list not saved in db');
        } else {
          updateListName(itemID, input);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <li
      className={isActive ? 'activeList itemList loading' : 'itemList loading'}
      id={'list' + itemID}
      onClick={handleSetList}>
      <div className='list-icon'>
        <FcDatabase size='20px' />
      </div>

      <input
        type='text'
        value={input}
        readOnly={readOnly}
        maxLength={20}
        onChange={(event) => setInput(event.target.value)}
      />

      <div className='dropdown'>
        <button onClick={handleRemove} className='remove'>
          <i className='fa fa-trash'></i>
        </button>
        <button onClick={handleSave} className='edit'>
          <i
            className={
              buttonInput === 'Edit' ? 'fa fa-edit' : 'fa fa-save'
            }></i>
        </button>
      </div>
    </li>
  );
};
