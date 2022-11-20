import { createContext, useContext } from "react";
import { currentTasksState } from "../types/types";

export const useGlobalCurrentTasksContext = () =>
  useContext(CurrentTasksContext);
export const CurrentTasksContext = createContext<currentTasksState>({
  currentList: [],
  clearCurrentList: () => {},
  setCurrentList: () => {},
});
