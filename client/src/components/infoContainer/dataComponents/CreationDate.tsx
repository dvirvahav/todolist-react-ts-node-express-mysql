import { FC } from 'react';

export const CreationDate: FC<{ date: string }> = ({ date }) => {
  return <li className='infoItem'> {'Creation date: ' + date}</li>;
};
