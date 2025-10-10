interface NoResultMessageProps {
  message: string;
}

export const NoResultMessage = ({ message }: NoResultMessageProps) => {
  return (
    <div className="no-result">
      <p className="no-result__text">{message}</p>
    </div>
  );
};
