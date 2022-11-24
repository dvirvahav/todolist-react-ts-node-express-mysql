import { createContext, useCallback, useContext, useState } from "react";
import { listObject, listsContextProps } from "../types/types";

export const useGlobalListContext = () => useContext(ListContext);
export const ListContext = createContext<listsContextProps>({
  addNewList: () => {},
  removeItem: () => {},
  clearList: () => {},
  reloadNewList: () => {},
  lists: [],
});

export default function ListContextProvider({ children }: { children: any }) {
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
