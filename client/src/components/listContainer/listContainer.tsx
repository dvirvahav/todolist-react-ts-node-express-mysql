import { FC } from 'react';
import { ListItem } from './listItem';
import { FcAddDatabase } from 'react-icons/fc';

import { useListLogic } from './logic';

export const ListContainer: FC = () => {
  const { handleChange, handleSubmit, lists, input } = useListLogic();

  return (
    <div className='listContainer loading'>
      <ul className='listLists'>
        {lists.map((item) => (
          <ListItem
            key={item.listID}
            itemInput={item.listName}
            itemID={item.listID}
            isActive={item.isActive}
          />
        ))}
      </ul>
      <form className='formAddList ' onSubmit={handleSubmit}>
        <button>
          <FcAddDatabase size='20px' />
        </button>

        <input
          className='inputList'
          type='text'
          placeholder='New List'
          maxLength={20}
          value={input}
          onChange={handleChange}
          required
        />
      </form>
    </div>
  );
};
