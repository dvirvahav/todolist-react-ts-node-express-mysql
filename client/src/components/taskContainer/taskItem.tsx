import Axios from 'axios';
import { ChangeEvent, useState, FC } from 'react';
import { useCurrentTaskContext } from '../../context/currentTask';
import { useGeneralLogic } from '../allContexts';

export const TaskItem: FC<{
  itemInput: string;
  itemID: number;
  itemStatus: number;
  isActive: boolean;
}> = ({ itemInput, itemID, itemStatus, isActive }) => {
  const {
    removeTaskFromList,
    currentListID,
    lists,
    setActiveTask,
    setCurrentList,
    setCurrentTask,
  } = useGeneralLogic();

  const [input, setInput] = useState<string>(itemInput);
  const [buttonInput, setButtonInput] = useState<string>('Edit');
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const { setIsHidden } = useCurrentTaskContext();

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

    Axios.post('/api/updateTask', {
      taskID: itemID,
      newName: input,
    })
      .then((response) => {
        if (response.data === 'Error') {
          alert('Something went wrong, task name not updated in db');
        } else {
          lists.forEach((item) => {
            if (item.listID === currentListID) {
              item.tasks.forEach((taskItem) => {
                if (taskItem.taskID === itemID) {
                  taskItem.taskName = input;
                }
              });

              setCurrentList(item.tasks.slice());
            }
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  const handleRemove = () => {
    Axios.post('/api/removeTask', {
      taskID: itemID,
    })
      .then((response) => {
        if (response.data === 'Error') {
          alert('Something went wrong, list not deleted');
        } else {
          removeTaskFromList(itemID);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(() => {
      return e.target.value;
    });
  };

  const handleClick = () => {
    setIsHidden(false);
    setActiveTask(itemID);
    lists.forEach((item) => {
      if (item.listID === currentListID) {
        item.tasks.forEach((item) => {
          if (item.taskID === itemID) setCurrentTask(item);
        });
      }
    });
  };

  return (
    <li
      className={
        isActive
          ? 'taskItem  loading-normal  activeTask'
          : ' loading-normal  taskItem'
      }
      id={'task' + itemID}
      onClick={handleClick}>
      <input type='checkbox' className='checkbox-round' />

      <input
        className='inputTask'
        type='text'
        value={input}
        readOnly={readOnly}
        size={60}
        onChange={handleChange}
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
