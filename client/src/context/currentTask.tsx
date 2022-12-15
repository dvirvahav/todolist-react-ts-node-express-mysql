import { createContext, useContext, useState, Context } from 'react';
import { currentTask, taskObject } from '../types/types';

export const taskTemp: taskObject = {
  taskID: 0,
  taskName: '',
  info: {
    date: '',
    dueDate: undefined,
  },
  status: 0,
};
export const CurrentTaskContext: Context<currentTask> =
  createContext<currentTask>({
    currentTask: taskTemp,
    setCurrentTask: () => {},
    isHidden: false,
    setIsHidden: () => {},
  });

export const useCurrentTaskContext = () => useContext(CurrentTaskContext);

export function CurrentTaskContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [currentTask, setCurrentTask] = useState<taskObject>(taskTemp);
  const [isHidden, setIsHidden] = useState(false);
  return (
    <CurrentTaskContext.Provider
      value={{ currentTask, setCurrentTask, isHidden, setIsHidden }}>
      {children}
    </CurrentTaskContext.Provider>
  );
}
