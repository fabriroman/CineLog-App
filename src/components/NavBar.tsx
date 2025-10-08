import "../styles/NavBar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../features/auth/contexts/AuthContext";

export const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext must be used within AuthProvider");
  const { isAdmin, currentUser } = auth;

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
    <nav className="nav">
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
