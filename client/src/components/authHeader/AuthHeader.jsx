import "../navbar/Navbar.css";


function AuthHeader() {

  return (
    <nav className="top-nav">
      <ul>
        <li>
            <img src="../../../public/images/logo_terra_vista.png" alt="logo" className="top-nav--logo" />
        </li>
      </ul>
    </nav>
  );
}

export default AuthHeader;