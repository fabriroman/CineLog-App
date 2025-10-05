import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginForm } from "../../../components/LoginForm";
import "../../../styles/LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { pathname = "/" } = useLocation().state?.from || {};

  const handleSubmit = () => {
    navigate(pathname, { replace: true });
  };

  return (
    <section className="login">
      <h1 className="page-title">Login</h1>
      <LoginForm onSuccess={handleSubmit} />
      <div className="form__secondary">
        <Link to="/" className="nav-button">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
