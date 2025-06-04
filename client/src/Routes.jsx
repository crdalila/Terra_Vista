import { createBrowserRouter } from "react-router-dom";

import CreateUser from "./pages/auth/CreateUser";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Root from "./pages/root/Root";
import Layout from "./components/layout/Layout";
import ProjectList from "./pages/projects/ProjectList";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/create-user",
                element: <CreateUser />,
            },
            {
                path: "/user/projects",
                element: <ProjectList />,
            },
            {
                element: <Layout />,
                children: [
                    {
                        path: "/",
/*                         loader: async () => getProjectsByUserId(), */
                        shouldRevalidate: () => true,
                        children: [
                            /* TODO ELEMENTOS */
                        ]
                    },
                ],
            }
        ]
    }
]);

export default router;