import { createContext, useContext, useState, Context } from 'react';
import { userObject, userState } from '../types/types';

export const useUserContext = () => useContext(UserContext);
export const tempUser: userObject = {
  username: '',
  first: '',
  last: '',
  mail: '',
};
export const UserContext: Context<userState> = createContext<userState>({
  profile: tempUser,
  setUser: () => {},
});

export function UserContextProvider({ children }: { children: JSX.Element }) {
  const [profile, setUser] = useState({} as userObject);
  return (
    <UserContext.Provider value={{ profile, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
