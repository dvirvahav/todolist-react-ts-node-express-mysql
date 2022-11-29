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
}> = ({ itemInput, itemID, itemStatus }) => {
  const { currentListID } = useCurrentListIDContext();
  const { lists } = useListContext();
  const { setCurrentList } = useCurrentListContext();
  const { setCurrentTask } = useCurrentTaskContext();

  const [input, setInput] = useState<string>(itemInput);
  const [buttonInput, setButtonInput] = useState<string>('Edit');
  const [readOnly, setReadOnly] = useState<boolean>(true);

  const handleRemove = () => {
    Axios.post('/api/removeTask', {
      taskID: itemID,
    }).then((response) => {
      if (response.data === 'Error') {
        alert('Something went wrong, list not deleted');
      } else {
        lists.forEach((item) => {
          if (item.listID === currentListID) {
            const index = item.pendingTasks
              .map((taskItem) => taskItem.taskID)
              .indexOf(itemID);

            item.pendingTasks = item.pendingTasks.splice(index, 1);

            setCurrentList(item.pendingTasks.slice());
          }
        });
      }
    });
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSave = () => {
    setReadOnly(!readOnly);
    if (readOnly) {
      setButtonInput('Save');
      return;
    } else setButtonInput('Edit');

    Axios.post('/api/updateTask', {
      taskID: itemID,
      newName: input,
    }).then((response) => {
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
    });
  };

  const handleClick = () => {
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
  const handleCheck = () => {
    // Axios.post("/api/updateTaskStatus", {
    //   taskID: itemID,
    //   itemStatus: itemStatus ? 0 : 1,
    // }).then((response) => {
    //   if (response.data === "Error") {
    //     alert("Something went wrong, task not updated");
    //   } else {
    //     lists.map((item) => {
    //       if (item.listID === currentListID) {
    //         if (itemStatus) {
    //           item.completedTasks.map((item) => {
    //             if (item.taskID === itemID) {
    //               item.status = 0;
    //             }
    //             return item;
    //           });
    //         } else {
    //           item.pendingTasks.map((item) => {
    //             if (item.taskID === itemID) {
    //               item.status = 1;
    //             }
    //             return item;
    //           });
    //         }
    //       }
    //       return item;
    //     });
    //   }
    // });
  };

  return (
    <li className='taskItem item' id={'task' + itemID} onClick={handleClick}>
      <input type='checkbox' onChange={handleCheck} />
      <input
        type='text'
        value={input}
        readOnly={readOnly}
        maxLength={20}
        onChange={handleChange}
      />
      <div className='buttonsGrid'>
        <button onClick={handleSave}>{buttonInput}</button>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </li>
  );
};
