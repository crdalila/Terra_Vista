import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import TopNavbar from "../navbar/TopNavbar";
import AsideNavbar from "../navbar/AsideNavbar";

const Layout = () => {

    const { userData, loading } = useContext(AuthContext);
    if (!userData) {
        if (loading) {
            return <div>Loading...</div>; //TODO spinner
        } else {
            return <Navigate to="/login" />
        }
    }

return (
    <>
        <TopNavbar />
        <AsideNavbar />
        <Outlet />
    </>
)
};

export default Layout