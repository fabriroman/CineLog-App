import { type ReactNode, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { currentUser, isAdmin } = useContext(AuthContext);
  const location = useLocation();

  if (!currentUser || !isAdmin) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <>{children}</>;
}
