import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

function AsideNavbar({ isOpen, toggleMenu }) {
  const userData = useContext(AuthContext);

  return (
    <nav className={`aside-nav ${isOpen ? "open" : ""}`}>
      {/* Burger icon */}
      <button className="burger-toggle" onClick={toggleMenu}>
        ☰
      </button>

      {/* Menu */}
      <ul>
        <li>
          <button className="notifications-button aside-navbar--button">
            Notifications
          </button>
        </li>
        <li>
          <NavLink to="/" className="aside-navbar--button projects-button">
            Projects
          </NavLink>
        </li>
        {userData && userData.userData.role === "projectManager" && (
          <li>
            <NavLink to="/users" className="aside-navbar--button users-button">
              Users
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="/instructions"
            className="aside-navbar--button instructions-button"
          >
            Manual
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AsideNavbar;
