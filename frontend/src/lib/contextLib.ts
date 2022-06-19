import { useContext, createContext } from "react";

type ContextProps = {
  isAuthenticated: boolean;
  userHasAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext({} as ContextProps);

export function useAppContext() {
  return useContext(AppContext);
}
