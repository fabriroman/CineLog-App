import "../styles/NavBar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../features/auth/contexts/AuthContext";

export const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, currentUser } = useContext(AuthContext);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const baseNavItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "profile", label: "Profile", path: "/profile" },
  ];

  // add btn admin if the user  is admin
  const navItems = isAdmin
    ? [{ id: "admin", label: "Admin", path: "/admin" }, ...baseNavItems]
    : baseNavItems;

  if (!currentUser) {
    return null;
  }

  return (
    <nav className="nav" aria-label="Navegación principal">
      <div className="nav__list">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav__button ${
              location.pathname === item.path ? "nav__button--active" : ""
            }`}
            onClick={() => handleNavigation(item.path)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};
