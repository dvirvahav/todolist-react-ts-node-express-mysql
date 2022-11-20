import { createContext, useContext } from "react";
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
