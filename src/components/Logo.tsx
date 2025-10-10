import logoImage from '../asset/cinelog.png'

interface LogoProps {
  text: string;
}

const Logo = ({ text }: LogoProps) => {
  return (
    <div className="logo">
      <img src={logoImage} alt="cineLog logo" className="logo__image" />

      {/* /** <h1 className="logo__text">{text}</h1>  */}
      <img src="./" alt="" />
    </div>
  );
};

export default Logo;
