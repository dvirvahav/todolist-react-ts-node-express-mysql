import { createContext, useCallback, useContext, useState } from "react";
import { currentListState, taskObject } from "../types/types";

export const useGlobalCurrentListContext = () => useContext(CurrentListContext);
export const CurrentListContext = createContext<currentListState>({
  currentList: new Map<number, taskObject>(),
  clearCurrentList: () => {},
  setCurrentList: () => {},
});

export default function CurrentListContextProvider({
  children,
}: {
  children: any;
}) {
  const [currentList, setCurrentList] = useState<Map<number, taskObject>>(
    new Map<number, taskObject>()
  );
  const clearCurrentList = useCallback(
    () => setCurrentList(new Map<number, taskObject>()),
    []
  );
  return (
    <CurrentListContext.Provider
      value={{ currentList, setCurrentList, clearCurrentList }}>
      {children}
    </CurrentListContext.Provider>
  );
}
