import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";
import NotificationList from "../notifications/Notifications";

function AsideNavbar({isOpen, toggleMenu }) {
  const { userData } = useContext(AuthContext);

  const [showNotif, setShowNotif] = useState(false);

  const handleNotifications = async () => {
    const newShowNotif = showNotif ? false : true;
    setShowNotif(newShowNotif);
  };

  const handleMenuClick = () => {
    toggleMenu();
    if (showNotif) {
      setShowNotif(false);
    }
  };


  return (
    <article className="aside-navbar-container">
      <nav className={`aside-nav ${isOpen ? "open" : ""}`}>
        {/* Burger icon */}
        <button className="burger-toggle" onClick={toggleMenu}>
          ☰
        </button>

        {/* Menu */}
        <ul>
          <li>
            <button onClick={handleNotifications} className="notifications-button aside-navbar--button">Notifications</button>
          </li>
          <li>
            <NavLink to="/" className="aside-navbar--button projects-button" onClick={handleMenuClick}>
              Projects
            </NavLink>
          </li>
          {userData && userData.role === "projectManager" && (
            <li>
              <NavLink to="/users" className="aside-navbar--button users-button" onClick={handleMenuClick}>
                Users
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/instructions"
              className="aside-navbar--button instructions-button" onClick={handleMenuClick}
            >
              FAQ
            </NavLink>
          </li>
        </ul>
      </nav>

      {showNotif && <NotificationList projects={userData.projects} />}
    </article>
  );
}

export default AsideNavbar;
