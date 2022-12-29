import {
  createContext,
  useCallback,
  useContext,
  useState,
  Context,
} from 'react';
import { useGeneralLogic } from '../components/allContexts';
import { list, ListState } from '../types/types';

export const useListContext = () => useContext(ListContext);
export const ListContext: Context<ListState> = createContext<ListState>({
  addNewList: () => {},
  removeItem: () => {},
  clearList: () => {},
  reloadNewList: () => {},
  setActiveItem: () => {},
  removeTaskFromList: () => {},
  updateListName: () => {},
  lists: [],
});

export function ListContextProvider({ children }: { children: JSX.Element }) {
  const [lists, setLists] = useState<list[]>([]);
  const { currentListID, setCurrentList, currentList } = useGeneralLogic();

  const addNewList = useCallback(
    (newList: list) => setLists([...lists, newList]),
    [lists]
  );
  const reloadNewList = useCallback((newList: list[]) => setLists(newList), []);
  const clearList = useCallback(() => setLists([]), []);

  const removeItem = useCallback(
    (itemID: number) =>
      setLists(lists.filter((item) => item.listID !== itemID)),
    [lists]
  );
  const updateListName = useCallback(
    (listID: number, newName: string) =>
      setLists((prevLists) => {
        const list = prevLists.find((list) => list.listID === listID);
        if (!list) return prevLists;

        list.listName = newName;

        const listIndex = prevLists.findIndex((list) => list.listID === listID);

        const newLists = [...prevLists];
        newLists[listIndex] = list;

        return newLists;
      }),
    []
  );

  const removeTaskFromList = useCallback(
    (taskItemID: number) => {
      setLists((prevLists) => {
        // Find the list with the matching ID
        const list = prevLists.find((list) => list.listID === currentListID);
        if (!list) return prevLists; // Return the original lists if no matching list is found

        // Filter out the task with the matching name from the list's tasks array
        list.tasks = list.tasks.filter((task) => task.taskID !== taskItemID);

        // Find the index of the list in the lists array
        const listIndex = prevLists.findIndex(
          (list) => list.listID === currentListID
        );

        // Create a new lists array with the list at the specified index replaced with the updated list
        const newLists = [...prevLists];
        newLists[listIndex] = list;
        setCurrentList(list.tasks.slice());
        return newLists;
      });
    },
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
        removeTaskFromList,
        clearList,
        removeItem,
        addNewList,
        setActiveItem,
        updateListName,
      }}>
      {children}
    </ListContext.Provider>
  );
}
