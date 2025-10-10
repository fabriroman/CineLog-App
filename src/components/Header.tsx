import { useContext } from "react";
import { AuthContext } from "../features/auth/contexts/AuthContext";
import "../styles/Header.css";
import Logo from "./Logo";
import { NavBar } from "./NavBar";

export const Header = () => {
  const authCtx = useContext(AuthContext);
  if (!authCtx) throw new Error("AuthContext must be used within AuthProvider");
  const { currentUser } = authCtx;

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo-section">
          <Logo text="Cine Log" />
        </div>
        <div className="header__user">
          <span className="header__user-message">
            Welcome {currentUser?.email}!
          </span>
        </div>
        <div className="header__actions">
          <NavBar />
        </div>
      </div>
    </header>
  );
};
