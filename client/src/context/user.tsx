import { createContext, useContext, useState, Context } from 'react';
import { user, UserState } from '../types/types';

export const useUserContext = () => useContext(UserContext);
export const tempUser: user = {
  username: '',
  first: '',
  last: '',
  mail: '',
};
export const UserContext: Context<UserState> = createContext<UserState>({
  profile: tempUser,
  setUserProfile: () => {},
});

export function UserContextProvider({ children }: { children: JSX.Element }) {
  const [profile, setUser] = useState({} as user);
  return (
    <UserContext.Provider value={{ profile, setUserProfile: setUser }}>
      {children}
    </UserContext.Provider>
  );
}
