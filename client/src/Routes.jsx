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
import CreateProjectForm from "./components/createProjectForm/createProjectForm";
import TaskDetail from "./pages/taskDetail/TaskDetail";
import RequestForm from "./pages/requestForm/RequestForm";

import projectUtils from "./utils/projects";
import { getUserAllProjects } from "./utils/user";
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
                        path: "/",
                        loader: async () => {
                            const userData = await getUserByCookies();
                            return getUserAllProjects(userData._id);
                        },
                        element: <Projects />
                    },
                    {
                        path: "/project",
                        loader: async () => {
                            const userData = await getUserByCookies();
                            const projectIds = await getUserAllProjects(userData._id);

                            const projects = await Promise.all(
                                projectIds.map(p => projectUtils.getProjectId(p._id))
                            );

                            return projects;
                        },
                        element: <ProjectDetail />
                    },
                    {
                        path: "/create-project",
                        element: <CreateProjectForm />
                    },
                    {
                        path: "/issue",
                        element: <TaskDetail />
                    },
                    {
                        path: "/create-issue",
                        element: <RequestForm />
                    }
                ],
            }
        ]
    }
]);

export default router;