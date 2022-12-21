import Axios from 'axios';
import { FC, useState } from 'react';
import { useCurrentTaskContext } from '../../../../context/currentTask';

export const DueDate: FC = () => {
  const { currentTask, setDueDate } = useCurrentTaskContext();
  const [dueDateInput, setDueDateInput] = useState<string>('');
  const [NewDuedatePopup, setDueDatePopup] = useState<boolean>(false);

  const handleDueDate = () => {
    setDueDatePopup(false);
    Axios.post('/api/insertTaskDueDate', {
      taskID: currentTask.taskID,
      dueDate: dueDateInput,
    }).then((response) => {
      if (response.data === 'Error') alert('Error');
      else setDueDate(dueDateInput);
    });
  };

  return (
    <div>
      <li className='taskItem item'>
        {currentTask.info.dueDate === undefined ? (
          <button onClick={() => setDueDatePopup(true)}>Add due date</button>
        ) : (
          <li>{'Due date: ' + currentTask.info.dueDate}</li>
        )}
      </li>
      {NewDuedatePopup && (
        <div className='popup'>
          <input
            type='date'
            onChange={(event) => {
              setDueDateInput(event.target.value);
            }}
          />
          <button onClick={handleDueDate}>OK</button>
          <button onClick={() => setDueDatePopup(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};
