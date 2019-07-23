import Link from "next/link";
import "./Header.styl";

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div className="Header">
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
  </div>
);

export default Header;
