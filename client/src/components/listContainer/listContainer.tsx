import { FC } from 'react';
import { ListItem } from './listItem';

import { useListLogic } from './logic';

export const ListContainer: FC = () => {
  const { handleChange, handleSubmit, lists, input } = useListLogic();

  return (
    <div className='listContainer'>
      <h1 className='headline'>Lists</h1>
      <ul className='categoryList'>
        <ul>
          {lists.map((item, idx) => (
            <ListItem
              key={`${item.listID}-${idx}`}
              itemInput={item.listName}
              itemID={item.listID}
              isActive={item.isActive}
            />
          ))}
        </ul>
      </ul>
      <form className='formAddList' onSubmit={handleSubmit}>
        <button>+</button>
        <input
          className='listInput'
          type='text'
          placeholder='Add a list'
          maxLength={20}
          value={input}
          onChange={handleChange}
          required
        />
      </form>
    </div>
  );
};
