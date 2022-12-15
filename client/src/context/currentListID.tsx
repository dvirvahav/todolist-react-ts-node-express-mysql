import { createContext, useContext, useState, Context } from 'react';
import { currentListID } from '../types/types';

export const useCurrentListIDContext = () => useContext(CurrentListIDContext);

export const CurrentListIDContext: Context<currentListID> =
  createContext<currentListID>({
    currentListID: 0,
    setCurrentListID: () => {},
  });

export function CurrentListIDContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [currentListID, setCurrentListID] = useState<number>(0);

  return (
    <CurrentListIDContext.Provider value={{ currentListID, setCurrentListID }}>
      {children}
    </CurrentListIDContext.Provider>
  );
}
