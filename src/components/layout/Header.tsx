import "../../styles/Header.css";
import { useLocation } from "react-router-dom";
import Logo from "../shared/Logo";
import { NavBar } from "./NavBar";

export const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAdminPage = location.pathname === "/admin";

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo-section">
          {isHomePage && <Logo text="Cine Log" />}
          {isAdminPage && <Logo text="Cine Log Admin Panel" />}
        </div>
        <div className="header__actions">
          <NavBar />
        </div>
      </div>
    </header>
  );
};
