import { FC } from 'react';
import { useTaskLogic } from './logic';
import { FcAddRow } from 'react-icons/fc';
export const TaskForm: FC = () => {
  const { submit, handleChange, input } = useTaskLogic();
  return (
    <form className='formAdd' onSubmit={submit}>
      <button>
        <FcAddRow size='20px' />
      </button>

      <input
        className='taskInput'
        type='text'
        placeholder='New Task'
        maxLength={90}
        value={input} // in order to clear it with setInputValue
        onChange={handleChange} // updating InputValue
        required
      />
    </form>
  );
};
