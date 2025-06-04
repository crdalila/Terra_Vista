import { createBrowserRouter } from "react-router-dom";

import Register from "./pages/auth/Register";
import FirstLogin from "./pages/auth/FirstLogin";
import Login from "./pages/auth/Login";
import Root from "./pages/root/Root";
import Layout from "./components/layout/Layout";


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
                path: "/first-login",
                element: <FirstLogin />,
            },
            {
                path: "/register",
                element: <Register />,
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