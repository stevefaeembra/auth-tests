import { Dispatch, FC, ReactElement, createContext, useState } from 'react';

export interface User {
  email: string;
  name?: string;
  accessToken?: string;
  roles?: number[];
}

export type AuthenticationContextType = {
  userId: string | null;
  setUserId: Dispatch<string | null>;
  user: User | null;
  setUser: Dispatch<User | null>;
  accessToken: string | null;
  setAccessToken: Dispatch<string | null>;
};

export const AuthenticationContext = createContext<AuthenticationContextType | null>(null);
AuthenticationContext.displayName = 'AuthenticationContext';

interface Props {
  children: ReactElement;
}

export const AuthenticationProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<User | null>(null);

  return (
    <AuthenticationContext.Provider value={{ userId, setUserId, user, setUser, accessToken, setAccessToken }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
