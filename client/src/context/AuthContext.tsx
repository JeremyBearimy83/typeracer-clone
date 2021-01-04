import React, { ReactElement, useContext, useState } from "react";

interface Props {
  children: ReactElement[] | ReactElement;
}

type User = any | null;

const AuthContext = React.createContext<User>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: Props): ReactElement {
  const [currentUser, setCurrentUser] = useState<User>(null);

  const register = async (email: string, password: string) => {};

  const login = async (email: string, password: string) => {};

  const logout = async () => {};

  const value = {
    currentUser,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
