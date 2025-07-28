import { createContext, useContext } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void;
};

export const authContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContext");
  }
  return context;
};
