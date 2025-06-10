import { useContext, useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import TopNavbar from "../navbar/TopNavbar";
import AsideNavbar from "../navbar/AsideNavbar";

import useScrollToTop from "../../components/scrollToTop/ScrollToTop";

const Layout = () => {
  const { userData, loading } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!userData) {
    if (loading) return <div>Loading...</div>;
    return <Navigate to="/login" />;
  }

  useScrollToTop();

  return (
    <>
      <TopNavbar />
      <AsideNavbar
        isOpen={!isMobile || isMenuOpen}
        toggleMenu={() => setIsMenuOpen((prev) => !prev)}
      />
      <Outlet />
    </>
  );
};

export default Layout;
