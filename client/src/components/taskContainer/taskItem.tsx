import Axios from 'axios';
import { ChangeEvent, useState, FC } from 'react';
import { useCurrentListIDContext } from '../../context/currentListID';
import { useCurrentTaskContext } from '../../context/currentTask';
import { useCurrentListContext } from '../../context/currentList';
import { useListContext } from '../../context/list';

export const TaskItem: FC<{
  itemInput: string;
  itemID: number;
  itemStatus: number;
  isActive: boolean;
}> = ({ itemInput, itemID, itemStatus, isActive }) => {
  const { currentListID } = useCurrentListIDContext();
  const { lists } = useListContext();
  const { setCurrentList, setActiveTask } = useCurrentListContext();
  const { setCurrentTask } = useCurrentTaskContext();
  const [input, setInput] = useState<string>(itemInput);
  const [buttonInput, setButtonInput] = useState<string>('Edit');
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const { setIsHidden } = useCurrentTaskContext();

  const handleRemove = () => {
    Axios.post('/api/removeTask', {
      taskID: itemID,
    })
      .then((response) => {
        if (response.data === 'Error') {
          alert('Something went wrong, list not deleted');
        } else {
          lists.forEach((item) => {
            if (item.listID === currentListID) {
              const index = item.pendingTasks
                .map((taskItem) => taskItem.taskID)
                .indexOf(itemID);

              item.pendingTasks.splice(index, 1);

              setCurrentList(item.pendingTasks.slice());
            }
          });
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
              item.pendingTasks.forEach((taskItem) => {
                if (taskItem.taskID === itemID) {
                  taskItem.taskName = input;
                }
              });

              setCurrentList(item.pendingTasks.slice());
            }
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleClick = () => {
    setIsHidden(false);
    setActiveTask(itemID);
    lists.forEach((item) => {
      if (item.listID === currentListID) {
        if (itemStatus) {
          item.completedTasks.forEach((item) => {
            if (item.taskID === itemID) setCurrentTask(item);
          });
        } else {
          item.pendingTasks.forEach((item) => {
            if (item.taskID === itemID) setCurrentTask(item);
          });
        }
      }
    });
  };

  return (
    <li
      className={isActive ? 'taskItem item activeTask' : 'taskItem item'}
      id={'task' + itemID}
      onClick={handleClick}>
      <input
        type='text'
        value={input}
        readOnly={readOnly}
        size={60}
        onChange={handleChange}
      />
      <div className='buttonsGrid'>
        <button onClick={handleSave}>{buttonInput}</button>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </li>
  );
};
