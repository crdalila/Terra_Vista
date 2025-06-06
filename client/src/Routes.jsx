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
import ProjectDetail from "./pages/projects/ProjectDetail";

import { getUserAllProjects } from "./utils/user";
import projectUtils from "./utils/projects";
import getUserByCookies from "./utils/cookies";

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
                        element: <Profile />
                    },
                    {
                        path: "/projects",
                        loader: async () => {
                            const userData = await getUserByCookies();
                            console.log(userData);
                            return userData.projects;
                        },
                        element: <Projects />
                    },
                    {
                        path: "/project",
                        loader: async () => {
                            const userData = await getUserByCookies();
                            return projectUtils.getProjectId(userData.projects._id);
                        },
                        element: <ProjectDetail />
                    }
                ],
            }
        ]
    }
]);

export default router;