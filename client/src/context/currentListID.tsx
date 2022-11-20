import { createContext, useContext } from "react";
import { currentListID } from "../types/types";

export const useGlobalCurrentListIDContext = () =>
  useContext(CurrentListIDContext);

export const CurrentListIDContext = createContext<currentListID>({
  currentListID: 0,
  setCurrentListID: () => {},
});
