import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  authService,
  AuthUser,
} from "@/services/authService";

type AuthContextData = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<boolean>;

  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

type Props = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: Props) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadSession() {
      const savedUser =
        await authService.loadUser();

      setUser(savedUser);

      setLoading(false);
    }

    loadSession();
  }, []);

  async function login(
    email: string,
    password: string
  ) {
    const authenticatedUser =
      await authService.login(
        email,
        password
      );

    if (!authenticatedUser) {
      return false;
    }

    setUser(authenticatedUser);

    return true;
  }

  async function logout() {
    await authService.logout();

    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,

      loading,

      isAuthenticated:
        user !== null,

      login,

      logout,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}