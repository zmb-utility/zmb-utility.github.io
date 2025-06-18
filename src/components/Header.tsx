import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md">
      <nav className="w-full max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">CS2 Utility Hub</Link>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/wall-of-fame"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Wall of Fame
            </Link>
          </li>
          <li>
            <Link
              to="/wall-of-shame"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Wall of Shame
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
