import { createContext } from "react";
import type { User } from "../../../types/auth";

export type LoginResult = { ok: true } | { ok: false; error: string | null };

export type AuthContextType = {
  currentUser: User | null;
  isAdmin: boolean;
  login: (email: string) => LoginResult;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
