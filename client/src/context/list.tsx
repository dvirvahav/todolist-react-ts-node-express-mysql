import {
  createContext,
  useCallback,
  useContext,
  useState,
  Context,
} from 'react';
import { listObject, listsContextProps } from '../types/types';

export const useListContext = () => useContext(ListContext);
export const ListContext: Context<listsContextProps> =
  createContext<listsContextProps>({
    addNewList: () => {},
    removeItem: () => {},
    clearList: () => {},
    reloadNewList: () => {},
    setActiveItem: () => {},
    lists: [],
  });

export function ListContextProvider({ children }: { children: JSX.Element }) {
  const [lists, setLists] = useState<listObject[]>([]);
  const addNewList = useCallback(
    (newList: listObject) => setLists([...lists, newList]),
    [lists]
  );
  const reloadNewList = useCallback(
    (newList: listObject[]) => setLists(newList),
    []
  );
  const clearList = useCallback(() => setLists([]), []);

  const removeItem = useCallback(
    (itemID: number) =>
      setLists(lists.filter((item) => item.listID !== itemID)),
    [lists]
  );
  const setActiveItem = useCallback(
    (itemID: number) =>
      setLists(
        lists.map((item) => {
          if (item.listID === itemID) {
            item.isActive = true;
          } else item.isActive = false;
          return item;
        })
      ),
    [lists]
  );
  return (
    <ListContext.Provider
      value={{
        lists,
        reloadNewList,
        clearList,
        removeItem,
        addNewList,
        setActiveItem,
      }}>
      {children}
    </ListContext.Provider>
  );
}
