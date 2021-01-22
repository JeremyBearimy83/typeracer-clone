import React, { ReactElement, useContext, useState } from "react";
import { IUser, Nullable } from "../utils/types";

interface Props {
  children: ReactElement;
}

interface Value {
  currentUser: Nullable<IUser>;
  setCurrentUser: any;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<Nullable<Value>>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: Props): ReactElement {
  const [currentUser, setCurrentUser] = useState<Nullable<IUser>>(null);

  const register = async (email: string, password: string) => {};

  //OK I FUCKED UP AND IMPLEMENTED THIS SOMEWHERE ELSE, TO LAZY TO CHANGE RIGHT NOW
  //HAVE TO REFACTOR A LOT OF CODE ANYWAYS
  const login = async (email: string, password: string) => {};

  const logout = async () => {
    setCurrentUser(null);
  };

  const value: Value = {
    currentUser,
    setCurrentUser,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
