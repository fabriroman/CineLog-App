import "../styles/NavBar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../features/auth/contexts/AuthContext";

export const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext must be used within AuthProvider");
  const { isAdmin, currentUser, logout } = auth;

  const handleNavigation = (path: string) => {
    if (path === "/profile" && !currentUser) {
      navigate("/login", { state: { from: { pathname: path } } });
    } else {
      navigate(path);
    }
  };

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const PROTECTED_ROUTES = ["/profile", "/admin"];

  const handleLogout = () => {
    try {
      if (window.confirm("Are you sure you want to logout?")) {
        setIsLoggingOut(true);
        logout();

        const currentPath = location.pathname;
        if (PROTECTED_ROUTES.includes(currentPath)) {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Error during logout. Please try again.");
    } finally {
      setIsLoggingOut(false);
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

      <input type="checkbox" id="nav-toggle" className="nav__checkbox" />
      <label htmlFor="nav-toggle" className="nav__toggle">☰</label>
      <div className="nav__list">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav__button ${location.pathname === item.path ? "nav__button--active" : ""
              }`}
            onClick={() => handleNavigation(item.path)}
          >
            {item.label}
          </button>
        ))}
        {currentUser && (
          <button
            className="nav__button nav__button--logout"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        )}
      </div>
    </nav>
  );
};
