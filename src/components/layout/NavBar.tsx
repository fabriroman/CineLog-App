import "../styles/NavBar.css";
import { useLocation, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: "admin", label: "Admin", path: "/admin" },
    { id: "home", label: "Home", path: "/" },
    { id: "profile", label: "Profile", path: "/profile" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

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
