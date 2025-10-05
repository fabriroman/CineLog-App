interface LogoProps {
  text: string;
}

const Logo = ({ text }: LogoProps) => {
  return (
    <div className="logo">
      <h1 className="logo__text">{text}</h1>
    </div>
  );
};

export default Logo;
