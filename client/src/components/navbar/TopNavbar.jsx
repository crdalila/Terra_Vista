import { Link } from "react-router-dom";

import "./Navbar.css";


function TopNavbar() {
  return (
    <nav className="top-nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export default TopNavbar;