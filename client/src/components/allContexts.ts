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
  } = useListContext();

  const { setCurrentListID, currentListID } = useCurrentListIDContext();
  const { profile, setUser } = useUserContext();
  const {
    currentTask,
    setCurrentTask,
    isHidden,
    setIsHidden,
    setNewLink,
    setDueDate,
  } = useCurrentTaskContext();

  return {
    currentTask,
    setCurrentTask,
    isHidden,
    setIsHidden,
    setNewLink,
    setDueDate,
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
  };
};
