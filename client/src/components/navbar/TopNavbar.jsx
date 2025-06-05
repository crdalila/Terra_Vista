import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

import "./Navbar.css";


function TopNavbar() {
  const userData = useContext(AuthContext);

  return (
    <nav className="top-nav">
      <ul>
        <li>
          <Link to="/">
            <img src="../../../public/images/logo_terra_vista.svg" alt="logo" className="top-nav--logo" />
          </Link>
        </li>
        <li>
          <Link to='/profile' className="profile-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="var(--main-color)" width='24' height='24'>
              <path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
            </svg>
            <p>Profile<i>!</i></p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default TopNavbar;