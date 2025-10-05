import "../styles/NavBar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../features/user/contexts/UserContext";

export const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useContext(UserContext);
  if (!user) throw new Error("UserContext must be used within UserProvider");
  const { isAdmin, currentUser } = user;

  const handleNavigation = (path: string) => {
    if (path === "/profile" && !currentUser) {
      navigate("/login", { state: { from: { pathname: path } } });
    } else {
      navigate(path);
    }
  };

  const baseNavItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "profile", label: "Profile", path: "/profile" },
  ];

  // add btn admin if the user  is admin
  const navItems = isAdmin
    ? [{ id: "admin", label: "Admin", path: "/admin" }, ...baseNavItems]
    : baseNavItems;

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
