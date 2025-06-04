import TopNavbar from "../navbar/TopNavbar";
import AsideNavbar from "../navbar/AsideNavbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <TopNavbar />
            <AsideNavbar />
            <Outlet />
        </>
    )
};

export default Layout