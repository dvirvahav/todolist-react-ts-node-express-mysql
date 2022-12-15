import {
  createContext,
  useCallback,
  useContext,
  useState,
  Context,
} from 'react';
import { currentListState, taskObject } from '../types/types';

export const useCurrentListContext = () => useContext(CurrentListContext);
export const CurrentListContext: Context<currentListState> =
  createContext<currentListState>({
    currentList: [],
    clearCurrentList: () => {},
    setCurrentList: () => {},
  });

export function CurrentListContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [currentList, setCurrentList] = useState<taskObject[]>([]);
  const clearCurrentList = useCallback(() => setCurrentList([]), []);
  return (
    <CurrentListContext.Provider
      value={{ currentList, setCurrentList, clearCurrentList }}>
      {children}
    </CurrentListContext.Provider>
  );
}
