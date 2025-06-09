import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";


import "./Navbar.css";
import NotificationList from "../notifications/Notifications";

function AsideNavbar() {
  const { userData } = useContext(AuthContext);

  const [showNotif, setShowNotif] = useState(false);

  const handleNotifications = async () => {
    const newShowNotif = showNotif ? false : true;
    setShowNotif(newShowNotif);

  };


  return (
    <nav className="aside-nav">
      <ul>
        <li>
          <button onClick={handleNotifications} className="notifications-button aside-navbar--button">Notifications</button>

          {showNotif && <NotificationList projects={userData.projects} />}

        </li>
        <li>
          <NavLink to='/' className='aside-navbar--button projects-button'>Projects</NavLink>
        </li>
        {userData && userData.role === "projectManager" && (
          <li>
            <NavLink to="/users" className='aside-navbar--button users-button'>Users</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/instructions" className='aside-navbar--button instructions-button'>Manual</NavLink>
        </li>
      </ul>
      {/* <button className="settings-button">Settings</button> */}
    </nav>
  );
}

export default AsideNavbar;