import { NavLink } from "react-router-dom";
import { useContext, useEffect,useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import "./Navbar.css";
import NotificationList from "../notifications/Notifications";

function AsideNavbar() {
  const userData = useContext(AuthContext);

  const [projects, setProjects] = useState([]);
  
      useEffect(() => {
          let myproject = [];
          userData.projects.forEach((project)=> {
              project.project.forEach((task)=>{
                  myproject.push(task);
              });
          });
          setProjects(myproject);
      },setProjects);

  return (
    <nav className="aside-nav">
      <ul>
        <li>
          <button className="notifications-button aside-navbar--button">Notifications</button>
          <NotificationList projects={projects}/>
        </li>
        <li>
          <NavLink to='/' className='aside-navbar--button projects-button'>Projects</NavLink>
        </li>
        {userData && userData.userData.role === "projectManager" && (
          <li>
            <NavLink to="/users" className='aside-navbar--button users-button'>Users</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/instructions" className='aside-navbar--button instructions-button'>Instructions</NavLink>
        </li>
      </ul>
      {/* <button className="settings-button">Settings</button> */}
    </nav>
  );
}

export default AsideNavbar;