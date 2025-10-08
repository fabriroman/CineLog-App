import { type ReactNode } from "react";
import "../styles/ProfileCardActions.css";

interface CardActionsProps {
  children: ReactNode;
}

export const CardActions = ({ children }: CardActionsProps) => {
  return <div className="card-actions">{children}</div>;
};

interface CardButtonProps {
  onClick?: () => void;
  variant?: "primary" | "danger" | "info";
  disabled?: boolean;
  children: ReactNode;
  href?: string;
}

export const CardButton = ({
  onClick,
  variant = "primary",
  disabled = false,
  children,
  href,
}: CardButtonProps) => {
  const className = `card-button card-button--${variant}`;

  if (href) {
    return (
      <a href={href} className={className}>
        <span className="card-button__text">{children}</span>
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      <span className="card-button__text">{children}</span>
    </button>
  );
};
