import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import TopNavbar from "../navbar/TopNavbar";
import AsideNavbar from "../navbar/AsideNavbar";
import { Outlet,Navigate } from "react-router-dom";

const Layout = () => {

    const { userData, loading } = useContext(AuthContext);
    if (!userData) {
        if (loading) {
            return null // TODO componente de cargando
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