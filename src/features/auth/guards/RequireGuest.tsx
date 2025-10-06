import { useContext, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export function RequireGuest({ children }: { children: ReactNode }) {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext must be used within AuthProvider");
  const { currentUser } = auth;
  const { pathname: fromPath = "/" } = useLocation().state?.from || {};

  if (currentUser) {
    return <Navigate to={fromPath} replace />;
  }
  return <>{children}</>;
}
