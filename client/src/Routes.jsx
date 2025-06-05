import { createBrowserRouter } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";

import CreateUser from "./pages/auth/CreateUser";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Instructions from "./pages/instructions/Instructions";
import Root from "./pages/root/Root";
import Layout from "./components/layout/Layout";
import Profile from "./pages/profile/Profile";
import Projects from "./pages/projects/Projects";

import userService from "./utils/user";
import projectService from "./utils/projects";

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
                shouldRevalidate: () => true,
                children: [
                    {
                        path: "/instructions",
                        element: <Instructions />
                    },
                    {
                        path: '/profile',
                        loader: async () => userService.getUserById(),
                        element: <Profile />
                    },
                    {
                        path: "/user/projects/:id",
                        loader: async () => projectService.getUserProjects(),
                        element: <Projects />
                    }
                ],
            }
        ]
    }
]);

export default router;