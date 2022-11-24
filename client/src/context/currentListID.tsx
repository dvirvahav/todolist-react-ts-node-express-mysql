import { createContext, useContext, useState } from "react";
import { currentListID } from "../types/types";

export const useGlobalCurrentListIDContext = () =>
  useContext(CurrentListIDContext);

export const CurrentListIDContext = createContext<currentListID>({
  currentListID: 0,
  setCurrentListID: () => {},
});

export default function CurrentListIDContextProvider({
  children,
}: {
  children: any;
}) {
  const [currentListID, setCurrentListID] = useState<number>(0);

  return (
    <CurrentListIDContext.Provider value={{ currentListID, setCurrentListID }}>
      {children}
    </CurrentListIDContext.Provider>
  );
}
