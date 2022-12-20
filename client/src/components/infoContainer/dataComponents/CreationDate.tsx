import { FC } from 'react';

export const CreationDate: FC<{ date: string }> = ({ date }) => {
  return <li className='taskItem item'> {'Creation date: ' + date}</li>;
};
