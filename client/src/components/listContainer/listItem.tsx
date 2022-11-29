import Axios from 'axios';
import { FC, useState } from 'react';
import { useCurrentListContext } from '../../context/currentList';
import { useCurrentListIDContext } from '../../context/currentListID';

import { useListContext } from '../../context/list';
import { taskObject } from '../../types/types';

export const ListItem: FC<{
  itemInput: string;
  itemID: number;
  isActive: boolean;
}> = ({ itemInput, itemID }) => {
  const { setCurrentList } = useCurrentListContext();
  const { lists, removeItem } = useListContext();
  const { currentListID, setCurrentListID } = useCurrentListIDContext();
  const [buttonInput, setButtonInput] = useState<string>('Edit');
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [input, setInput] = useState<string>(itemInput);

  const handleSetList = () => {
    setCurrentListID(itemID);

    lists.forEach((item: { listID: number; pendingTasks: taskObject[] }) => {
      if (item.listID === itemID) {
        setCurrentList(item.pendingTasks);
      }
    });
  };

  const handleRemove = () => {
    Axios.post('/api/removeList', {
      listID: itemID,
    }).then((response) => {
      if (response.data === 'Error') {
        alert('Something went wrong, list not deleted');
      } else {
        removeItem(itemID);
      }
    });
  };

  const handleSave = () => {
    setReadOnly(!readOnly);
    if (!readOnly) {
      setButtonInput('Edit');
      return;
    } else setButtonInput('Save');
    Axios.post('/api/updateList', {
      listID: itemID,
      newName: input,
    }).then((response) => {
      if (response.data === 'Error') {
        alert('Something went wrong, list not saved in db');
      } else {
        lists.forEach((item) => {
          if (item.listID === currentListID) {
            item.listName = input;
          }
        });
      }
    });
  };

  return (
    <li className='item' id={'list' + itemID} onClick={handleSetList}>
      <input
        type='text'
        value={input}
        readOnly={readOnly}
        maxLength={20}
        onChange={(event) => setInput(event.target.value)}
      />

      <div className='buttonsGrid '>
        <button onClick={handleSave}>{buttonInput}</button>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </li>
  );
};
