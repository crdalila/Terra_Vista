import { createBrowserRouter } from "react-router-dom";

import CreateUser from "./pages/auth/CreateUser";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Instructions from "./pages/instructions/Instructions";
import Root from "./pages/root/Root";
import Layout from "./components/layout/Layout";
import Profile from "./pages/profile/Profile";

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
                element: <Layout />,
                children: [
                    {
                        path: "/instructions",
                        shouldRevalidate: () => true,
                        element: <Instructions />
                    },
                    {
                        path: '/profile',
                        shouldRevalidate: () => true,
                        element: <Profile />
                    }
                ],
            }
        ]
    }
]);

export default router;