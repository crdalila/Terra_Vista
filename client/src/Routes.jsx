import { createBrowserRouter } from "react-router-dom";

import CreateUser from "./pages/auth/CreateUser";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Instructions from "./pages/instructions/Instructions";
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
                        path: '/', /* TODO CAMBIAR A INSTRUCTIONS */
                        shouldRevalidate: () => true,
                        element: <Instructions />
                    },
                ],
            }
        ]
    }
]);

export default router;