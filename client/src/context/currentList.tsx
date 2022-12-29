import {
  createContext,
  useCallback,
  useContext,
  useState,
  Context,
} from 'react';
import { CurrentListState, task } from '../types/types';

export const useCurrentListContext = () => useContext(CurrentListContext);
export const CurrentListContext: Context<CurrentListState> =
  createContext<CurrentListState>({
    currentList: [],
    clearCurrentList: () => {},
    setCurrentList: () => {},
    setActiveTask: () => {},
  });

export function CurrentListContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [currentList, setCurrentList] = useState<task[]>([]);
  const clearCurrentList = useCallback(() => setCurrentList([]), []);
  const setActiveTask = useCallback(
    (itemID: number) =>
      setCurrentList(
        currentList.map((item: task) => {
          if (item.taskID === itemID) {
            item.isActive = !item.isActive;
          } else item.isActive = false;
          return item;
        })
      ),
    [currentList]
  );
  return (
    <CurrentListContext.Provider
      value={{ currentList, setCurrentList, clearCurrentList, setActiveTask }}>
      {children}
    </CurrentListContext.Provider>
  );
}
