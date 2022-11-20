import { createContext, useContext } from "react";
import { listsContextProps } from "../types/types";

export const useGlobalListContext = () => useContext(ListContext);
export const ListContext = createContext<listsContextProps>({
  addNewList: () => {},
  removeItem: () => {},
  clearList: () => {},
  reloadNewList: () => {},
  lists: [],
});
