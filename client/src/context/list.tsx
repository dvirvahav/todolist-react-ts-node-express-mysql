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
    (itemID: number) => setLists(lists.filter((t) => t.listID !== itemID)),
    [lists]
  );

  return (
    <ListContext.Provider
      value={{ lists, reloadNewList, clearList, removeItem, addNewList }}>
      {children}
    </ListContext.Provider>
  );
}
