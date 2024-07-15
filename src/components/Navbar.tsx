import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.scss';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav role="navigation" aria-label="Main navigation">
      <ul className="navbar">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/" aria-current={location.pathname === "/" ? "page" : undefined}>
            Home
          </Link>
        </li>
        <li className={location.pathname === "/orders" ? "active" : ""}>
          <Link to="/orders" aria-current={location.pathname === "/orders" ? "page" : undefined}>
            Orders
          </Link>
        </li>
        <li className={location.pathname === "/about" ? "active" : ""}>
          <Link to="/about" aria-current={location.pathname === "/about" ? "page" : undefined}>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default React.memo(Navbar);
