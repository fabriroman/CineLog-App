import { getUserById } from "../../../data/users";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import type { Role, User } from "../../../types/auth";
import { AuthContext, type LoginResult } from "./AuthContext";

const STORAGE_KEY = "currentUser";
const ADMIN_EMAIL = "admin@cinelog.com";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser, clearCurrentUser] =
    useLocalStorage<User | null>(STORAGE_KEY, null);

  const login = (email: string): LoginResult => {
    const user = getUserById(email);
    if (!user) {
      return {
        ok: false,
        error: "User not found",
      };
    }
    const role: Role = email === ADMIN_EMAIL ? "admin" : "user";
    setCurrentUser({ id: email, email, role, username: user.username });
    return {
      ok: true,
    };
  };

  const logout = () => {
    clearCurrentUser();
  };

  const isAdmin = currentUser?.role === "admin";

  return (
    <AuthContext.Provider value={{ currentUser, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};