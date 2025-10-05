import { type ReactNode, useContext } from "react";
import { UserContext } from "../../user/contexts/UserContext";
import { Navigate, useLocation } from "react-router-dom";

export function RequireAdmin({ children }: { children: ReactNode }) {
  const user = useContext(UserContext);
  if (!user) throw new Error("UserContext must be used within UserProvider");
  const { currentUser, isAdmin } = user;
  const location = useLocation();

  if (!currentUser || !isAdmin) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <>{children}</>;
}
