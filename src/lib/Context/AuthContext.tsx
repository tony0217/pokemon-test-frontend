import useLocalStorage from '@lib/hooks/useLocalStorage';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const authContext = createContext<AuthContext | null>(null);

export function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const { storedValue, setValue, removeLocalStorage} = useLocalStorage('isAuthenticated', false )
  const { storedValue:userInfo, setValue: setUser} = useLocalStorage('userInfo', {})
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(Boolean(storedValue))

  const authLogin = useCallback((status: boolean) => {
    if(!status){
      removeLocalStorage()
    } 
    setValue(status);
    setIsAuthenticated(status);
  }, []);
    

  const value = useMemo(
    () => ({
      isAuthenticated,
      userInfo,
      setUser,
      authLogin,
    }),
    [
      isAuthenticated,
      userInfo,
      setUser,
      authLogin,
    ]
  );

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(authContext);

  if (!context) {
    throw new Error(
      'authContext must be used within a AuthContextProvider'
    );
  }

  return context;
}

export interface AuthContext {
  isAuthenticated: boolean;
  userInfo:any;
  setUser:React.Dispatch<React.SetStateAction<any>>;
  authLogin: (status:boolean) => void;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}