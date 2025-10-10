import { useForm } from "react-hook-form";
import { AuthContext } from "../features/auth/contexts/AuthContext";
import { useContext } from "react";
import "../styles/LoginForm.css";

type LoginFormProps = {
  onSuccess: () => void;
};

type LoginFormValues = {
  email: string;
};

const EMAIL_VALIDATION = {
  required: "Email is required",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Enter a valid email",
  },
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext must be used within AuthProvider");
  const { login } = auth;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm<LoginFormValues>({
    mode: "onTouched",
    defaultValues: { email: "" },
  });

  const handleLogin = ({ email }: LoginFormValues) => {
    const normalizedEmail = email.trim().toLowerCase();
    const res = login(normalizedEmail);

    if (!res.ok) {
      const errorMessage = res.error || "This email is not allowed to log in.";
      setError("email", { message: errorMessage });
      return;
    }
    onSuccess();
  };

  return (
    <form className="form" onSubmit={handleSubmit(handleLogin)} noValidate>
      <div className="form__group">
        <label htmlFor="email" className="form__label">
          Email
        </label>
        <input
          id="email"
          className="form__input"
          type="email"
          aria-invalid={errors.email ? "true" : "false"}
          placeholder="e.g., admin@cinelog.com, user@cinelog.com"
          {...register("email", EMAIL_VALIDATION)}
        />
        {errors.email && (
          <p role="alert" className="form__error">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="form__actions">
        <button
          className="button"
          type="submit"
          disabled={isSubmitting || isSubmitSuccessful}
        >
          {isSubmitting ? "Logging in…" : "Login"}
        </button>
      </div>
    </form>
  );
};
