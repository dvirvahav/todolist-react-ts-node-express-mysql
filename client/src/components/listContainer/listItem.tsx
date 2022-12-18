import Axios from 'axios';
import { FC, useState } from 'react';
import { useCurrentListContext } from '../../context/currentList';
import { useCurrentListIDContext } from '../../context/currentListID';
import { taskTemp, useCurrentTaskContext } from '../../context/currentTask';

import { useListContext } from '../../context/list';
import { taskObject } from '../../types/types';

export const ListItem: FC<{
  itemInput: string;
  itemID: number;
  isActive: boolean;
}> = ({ itemInput, itemID, isActive }) => {
  const { setCurrentList } = useCurrentListContext();
  const { lists, removeItem, setActiveItem } = useListContext();
  const { currentListID, setCurrentListID } = useCurrentListIDContext();
  const [buttonInput, setButtonInput] = useState<string>('Edit');
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [input, setInput] = useState<string>(itemInput);
  const { setCurrentTask } = useCurrentTaskContext();
  const { setIsHidden } = useCurrentTaskContext();
  const handleSetList = () => {
    setIsHidden(true);
    setCurrentListID(itemID);
    setCurrentTask(taskTemp);
    lists.forEach(
      (item: {
        listID: number;
        pendingTasks: taskObject[];
        isActive: boolean;
      }) => {
        if (item.listID === itemID) {
          setActiveItem(item.listID);
          setCurrentList(item.pendingTasks);
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
    if (!readOnly) {
      setButtonInput(() => {
        return 'Edit';
      });
      return;
    } else
      setButtonInput(() => {
        return 'Save';
      });
    Axios.post('/api/updateList', {
      listID: itemID,
      newName: input,
    })
      .then((response) => {
        if (response.data === 'Error') {
          alert('Something went wrong, list not saved in db');
        } else {
          lists.forEach((item) => {
            if (item.listID === currentListID) {
              item.listName = input;
            }
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <li
      className={isActive ? 'activeList itemList' : 'itemList'}
      id={'list' + itemID}
      onClick={handleSetList}>
      <input
        type='text'
        value={input}
        readOnly={readOnly}
        maxLength={20}
        onChange={(event) => setInput(event.target.value)}
      />

      <div className='buttonsGrid'>
        <button onClick={handleSave}>{buttonInput}</button>
        <button onClick={handleRemove}>R</button>
      </div>
    </li>
  );
};
