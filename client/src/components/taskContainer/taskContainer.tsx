import { FC } from 'react';
import { useTaskLogic } from './logic';
import { TaskItem } from './taskItem';

export const TaskContainer: FC = () => {
  const { lists, currentListID, currentList, submit, handleChange, input } =
    useTaskLogic();

  return (
    <div className='taskContainer'>
      <div>
        {lists.map((item) => (
          <div key={item.listID} className='headline'>
            {item.listID === currentListID ? item.listName : null}
          </div>
        ))}
      </div>
      <br />
      <div className='allLists'>
        <ul className='pendingTaskList'>
          {currentList.map((item, idx) => (
            <TaskItem
              key={`${item.taskID}-${idx}`}
              itemInput={item.taskName}
              itemID={item.taskID}
              itemStatus={item.status}
              isActive={item.isActive}
            />
          ))}
        </ul>
      </div>
      <form className='formAdd' onSubmit={submit}>
        <button>+</button>
        <input
          className='taskInput'
          type='text'
          placeholder='Add a task'
          maxLength={90}
          value={input} // in order to clear it with setInputValue
          onChange={handleChange} // updating InputValue
          required
        />
      </form>
    </div>
  );
};
