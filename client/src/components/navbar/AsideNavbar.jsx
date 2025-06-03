import { NavLink } from "react-router-dom";

import NavbarProjects from "./NavbarProjects";

function AsideNavbar() {
  return (
    <nav className="aside-nav">
      <ul>
        <li>
          <button className="notifications-button">Notifications</button>
        </li>
        <li>
          <NavLink to='/projects'>Projects</NavLink>
        </li>
        <li>
          <NavLink to="/instructions">Instructions</NavLink>
        </li>
      </ul>
      {/* <button className="settings-button">Settings</button> */}
    </nav>
  );
}

export default AsideNavbar;