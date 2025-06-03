import { createBrowserRouter } from "react-router-dom";

import CreateUser from "./pages/auth/CreateUser";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

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
                        path: "/",
                        loader: async () => getProjectsByUserId(),
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