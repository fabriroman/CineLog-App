import { useContext, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../../user/contexts/UserContext";

export function RequireGuest({ children }: { children: ReactNode }) {
  const user = useContext(UserContext);
  if (!user) throw new Error("UserContext must be used within UserProvider");
  const { currentUser } = user;
  const { pathname: fromPath = "/" } = useLocation().state?.from || {};

  if (currentUser) {
    return <Navigate to={fromPath} replace />;
  }
  return <>{children}</>;
}
