import { useCurrentListContext } from '../context/currentList';
import { useCurrentListIDContext } from '../context/currentListID';
import { useCurrentTaskContext } from '../context/currentTask';
import { useListContext } from '../context/list';
import { useUserContext } from '../context/user';

export const useGeneralLogic = () => {
  const { currentList, setCurrentList, clearCurrentList, setActiveTask } =
    useCurrentListContext();
  const {
    lists,
    addNewList,
    removeItem,
    clearList,
    reloadNewList,
    setActiveItem,
    removeTaskFromList,
    updateListName,
  } = useListContext();

  const { setCurrentListID, currentListID } = useCurrentListIDContext();
  const { profile, setUserProfile: setUser } = useUserContext();
  const {
    currentTask,
    setCurrentTask,
    isHidden,
    setIsHidden,
    setNewLink,
    setNewNote,
    setDueDate,
  } = useCurrentTaskContext();

  return {
    currentTask,
    setCurrentTask,
    isHidden,
    setIsHidden,
    setNewLink,
    updateListName,
    setDueDate,
    removeTaskFromList,
    setCurrentList,
    lists,
    addNewList,
    setCurrentListID,
    profile,
    setUser,
    currentList,
    clearCurrentList,
    setActiveTask,
    removeItem,
    clearList,
    reloadNewList,
    setActiveItem,
    currentListID,
    setNewNote,
  };
};
