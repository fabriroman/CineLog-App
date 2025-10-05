import { useContext } from "react";
import { UserContext } from "../features/user/contexts/UserContext";
import "../styles/Header.css";
import Logo from "./Logo";
import { NavBar } from "./NavBar";

export const Header = () => {
  const authCtx = useContext(UserContext);
  if (!authCtx) throw new Error("UserContext must be used within UserProvider");
  const { currentUser } = authCtx;
  if (!currentUser) throw new Error("User not authenticated");

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
