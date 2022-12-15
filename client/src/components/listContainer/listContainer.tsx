import { FC } from 'react';
import { ListItem } from './listItem';

import { useListLogic } from './logic';

export const ListContainer: FC = () => {
  const { handleChange, handleSubmit, lists, input } = useListLogic();

  return (
    <div className='listContainer'>
      <ul className='pendingTaskList'>
        {lists.map((item, idx) => (
          <ListItem
            key={`${item.listID}-${idx}`}
            itemInput={item.listName}
            itemID={item.listID}
            isActive={item.isActive}
          />
        ))}
      </ul>
      <form className='formAddList' onSubmit={handleSubmit}>
        <button>+</button>
        <input
          type='text'
          placeholder='New list'
          maxLength={20}
          value={input}
          onChange={handleChange}
          required
        />
      </form>
    </div>
  );
};
