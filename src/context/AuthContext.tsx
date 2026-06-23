
// IMPORTS

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';


// TYPES

type User = {
  name: string;
  email: string;
  password: string;
};

type AuthContextType = {
  currentUser: User | null;
  register: (user: User) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};


// CONTEXT

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);


// PROVIDER

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('autumns-nook-current-user');

    return savedUser ? JSON.parse(savedUser) : null;
  });

  function register(user: User) {
    const users: User[] = JSON.parse(
      localStorage.getItem('autumns-nook-users') ?? '[]'
    );

    const userExists = users.some(
      (existingUser) => existingUser.email === user.email
    );

    if (userExists) {
      return false;
    }

    localStorage.setItem(
      'autumns-nook-users',
      JSON.stringify([...users, user])
    );

    localStorage.setItem(
      'autumns-nook-current-user',
      JSON.stringify(user)
    );

    setCurrentUser(user);

    return true;
  }

  function login(email: string, password: string) {
    const users: User[] = JSON.parse(
      localStorage.getItem('autumns-nook-users') ?? '[]'
    );

    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!foundUser) {
      return false;
    }

    localStorage.setItem(
      'autumns-nook-current-user',
      JSON.stringify(foundUser)
    );

    setCurrentUser(foundUser);

    return true;
  }

  function logout() {
    localStorage.removeItem('autumns-nook-current-user');

    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// CUSTOM HOOK

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}