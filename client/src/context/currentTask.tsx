import { createContext, useContext, useState } from 'react';
import { currentTask, taskObject } from '../types/types';

export const taskTemp: taskObject = {
  taskID: 0,
  taskName: '',
  info: {
    date: '',
  },
  status: 0,
};
export const CurrentTaskContext: React.Context<currentTask> =
  createContext<currentTask>({
    currentTask: taskTemp,
    setCurrentTask: () => {},
  });

export const useCurrentTaskContext = () => useContext(CurrentTaskContext);

export function CurrentTaskContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [currentTask, setCurrentTask] = useState<taskObject>(taskTemp);

  return (
    <CurrentTaskContext.Provider value={{ currentTask, setCurrentTask }}>
      {children}
    </CurrentTaskContext.Provider>
  );
}
