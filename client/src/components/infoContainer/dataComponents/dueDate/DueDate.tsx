import { FC, useState } from 'react';
import { useCurrentTaskContext } from '../../../../context/currentTask';

export const DueDate: FC = () => {
  const { currentTask, setDueDate } = useCurrentTaskContext();
  const [dueDateInput, setDueDateInput] = useState<string>('');
  const [NewDuedatePopup, setDuedatePopup] = useState<boolean>(false);
  const handleDueDate = () => {
    setDueDate(dueDateInput);
    setDuedatePopup(false);
  };

  return (
    <div>
      <li className='taskItem item'>
        {currentTask.info.dueDate === undefined ? (
          <button onClick={() => setDuedatePopup(true)}>Add due date</button>
        ) : (
          <li>{'Due date: ' + currentTask.info.dueDate}</li>
        )}
      </li>
      {NewDuedatePopup && (
        <div className='popup'>
          <input
            type='text'
            placeholder='Enter date'
            value={dueDateInput}
            onChange={(event) => {
              setDueDateInput(event.target.value);
            }}
          />
          <button onClick={handleDueDate}>OK</button>
          <button onClick={() => setDuedatePopup(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};
