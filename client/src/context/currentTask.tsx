import { createContext, useContext } from "react";
import { currentTask, taskObject } from "../types/types";

export const taskTemp: taskObject = {
  taskID: 0,
  taskName: "",
  info: {
    date: "",
  },
  status: 0,
};
export const CurrentTaskContext = createContext<currentTask>({
  currentTask: taskTemp,
  setCurrentTask: () => {},
});

export const useGlobalCurrentTaskContext = () => useContext(CurrentTaskContext);
