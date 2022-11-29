import { FC } from 'react';

export const DateItem: FC<{ date: string }> = ({ date }) => {
  return <li> {'Date:' + date}</li>;
};
