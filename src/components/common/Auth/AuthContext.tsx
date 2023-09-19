import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  setToken: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('jwt'));

  return (
    <AuthContext.Provider value={{ isLoggedIn: Boolean(token), token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
