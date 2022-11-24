import { createContext, useContext, useState } from "react";
import { userObject, userState } from "../types/types";

export const useGlobalUserContext = () => useContext(UserContext);
export const tempUser: userObject = {
  username: "",
  first: "",
  last: "",
  mail: "",
};
export const UserContext = createContext<userState>({
  profile: tempUser,
  setUser: () => {},
});

export default function UserContextProvider({ children }: { children: any }) {
  const [profile, setUser] = useState({} as userObject);
  return (
    <UserContext.Provider value={{ profile, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
