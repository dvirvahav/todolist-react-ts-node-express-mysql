import {
  createContext,
  useContext,
  useState,
  Context,
  useCallback,
} from 'react';
import { currentTask, hyperLink, note, task } from '../types/types';

export const taskTemp: task = {
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
    note: undefined,
    setCurrentTask: () => {},
    setIsHidden: () => {},
    setNewLink: () => {},
    setDueDate: () => {},
    setNewNote: () => {},
  });

export const useCurrentTaskContext = () => useContext(CurrentTaskContext);

export function CurrentTaskContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [currentTask, setCurrentTask] = useState<task>(taskTemp);
  const [isHidden, setIsHidden] = useState(false);
  const setNewNote = useCallback(
    (note: note) => {
      setCurrentTask({
        ...currentTask,
        info: { ...currentTask.info, note: note },
      });
    },
    [currentTask]
  );
  const setNewLink = useCallback(
    (link: hyperLink) => {
      setCurrentTask({
        ...currentTask,
        info: { ...currentTask.info, link: link },
      });
    },
    [currentTask]
  );
  const setDueDate = useCallback(
    (dueDate: string) => {
      setCurrentTask({
        ...currentTask,
        info: { ...currentTask.info, dueDate: dueDate },
      });
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
        setNewNote,
      }}>
      {children}
    </CurrentTaskContext.Provider>
  );
}
