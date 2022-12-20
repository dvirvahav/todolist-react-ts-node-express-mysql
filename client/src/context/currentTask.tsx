import {
  createContext,
  useContext,
  useState,
  Context,
  useCallback,
} from 'react';
import { currentTask, hyperlinkObject, taskObject } from '../types/types';

export const taskTemp: taskObject = {
  taskID: 0,
  taskName: '',
  info: {
    date: '',
    dueDate: undefined,
  },
  status: 0,
  isActive: false,
};
export const CurrentTaskContext: Context<currentTask> =
  createContext<currentTask>({
    currentTask: taskTemp,
    isHidden: false,
    link: undefined,
    dueDate: undefined,
    setCurrentTask: () => {},
    setIsHidden: () => {},
    setNewLink: () => {},
    setDueDate: () => {},
  });

export const useCurrentTaskContext = () => useContext(CurrentTaskContext);

export function CurrentTaskContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [currentTask, setCurrentTask] = useState<taskObject>(taskTemp);
  const [isHidden, setIsHidden] = useState(false);

  const setNewLink = useCallback(
    (link: hyperlinkObject) => {
      const newHyperlink: hyperlinkObject = link;
      currentTask.info.link = newHyperlink;
    },
    [currentTask]
  );
  const setDueDate = useCallback(
    (dueDate: string) => {
      currentTask.info.dueDate = dueDate;
    },
    [currentTask]
  );
  return (
    <CurrentTaskContext.Provider
      value={{
        currentTask,
        setCurrentTask,
        isHidden,
        setIsHidden,
        setNewLink,
        setDueDate,
      }}>
      {children}
    </CurrentTaskContext.Provider>
  );
}
