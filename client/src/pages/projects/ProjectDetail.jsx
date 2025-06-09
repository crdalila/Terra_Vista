import { useLoaderData, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { use, useContext, useEffect, useState } from "react";
import { useRef } from "react";

import { AuthContext } from "../../context/AuthContext";
import { ProjectContext } from "../../context/ProjectContext";
import TaskList from '../../components/taskList/TaskList'
import { useProject } from "../../context/ProjectContext";
import projectService from "../../utils/projects";
import userService from '../../utils/user';
import './ProjectDetail.css';

import DoughnutChart from "../../components/doughnutChart/DoughnutChart";
import user from "../../utils/user";

function ProjectDetail() {
    const navigate = useNavigate();
    const project = useLoaderData();
    const { selectedProject, setSelectedProject } = useProject();
    const projectTaskListRef = useRef(null);

    const { userData } = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [usersInProject, setUsersInProject] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showAddUserForm, setShowAddUserForm] = useState(false);

    // SELECTED PROJECT
    useEffect(() => {
        if (!selectedProject) {
            navigate("/");
            return;
        }
        const fetchUpdatedProject = async () => {
            try {
                const updatedProject = await projectService.getProjectId(selectedProject._id);
                setSelectedProject(updatedProject);
            } catch (err) {
                console.error("Failed to reload project:", err);
            }
        };
        fetchUpdatedProject();
    }, [navigate]);


    if (!selectedProject) return null;

    // SCROLL TO TASKS
    const handleScrollToTasks = () => {
        projectTaskListRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    const fetchUsers = async () => {
        try {
            if (userData && userData.role != "client") {
                const result = await userService.getAllUsers();
                if (Array.isArray(result)) {
                    const clients = result.filter(user => user.role === "client");
                    let clientsWithoutSelectedProject = [];
                    let clientWithSelectedProject = [];
                    clients.forEach((client) => {
                        let isProjectAlreadyAdded = false;
                        client.projects.forEach((project) => {
                            if (project._id == selectedProject._id) {
                                isProjectAlreadyAdded = true;
                            }
                        });
                        if (!isProjectAlreadyAdded) {
                            clientsWithoutSelectedProject.push(client);
                        } else {
                            clientWithSelectedProject.push(client);
                        }
                    });
                    setUsers(clientsWithoutSelectedProject);
                    setUsersInProject(clientWithSelectedProject);
                } else {
                    console.error("Can't get users");
                }
            }
        } catch (err) {
            console.error("Error getting users:", err);
        }
    };

    const ProgressBarChart = ({ project }) => {
        if (!project || !project.tasks || project.tasks.length === 0) {
            return <p>There are no tasks.</p>;
        }

        const totalTasks = project.tasks.length;
        const completedTasks = project.tasks.filter(task => task.done).length;
        const percentage = Math.round((completedTasks / totalTasks) * 100);

        return (
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${percentage}%` }} />
                <span className="progress-label">{percentage}% completed</span>
            </div>
        );
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddUsersToProject = async (e) => {
        e.preventDefault();

        if (!selectedUsers.length) {
            alert("Please select at least one user.");
            return;
        }
        try {
            for (const userId of selectedUsers) {
                await userService.addUserToProject(userId, selectedProject._id);
            }
            alert("Users added successfully.");
            setSelectedUsers([]); // Limpiar selección
            fetchUsers();
        } catch (err) {
            console.error("Error adding users to project", err);
            alert("Failed to add users to the project.");
        }
    };

    return (
        <article className="project-page article">

            <section className="page-header">
                <h2 className="page-title">{selectedProject.name}</h2>
                <div className="page-info">
                    <h3>Your website is ready for you.</h3>
                    <p>Explore your website and observe the details.</p>
                    <button className="start-project-button button" onClick={handleScrollToTasks}>Go to tasks<i>!</i></button>
                </div>
            </section>

            {userData && (userData.role === "admin" || userData.role === "projectManager") && (
                <section className="page-content">
                    <form className="add-user-to-project-form" onSubmit={handleAddUsersToProject}>
                        <label htmlFor="users">Select clients to add to this project: </label>
                        <select
                            id="users"
                            value={selectedUsers}
                            multiple
                            required
                            onChange={(e) =>
                                setSelectedUsers(Array.from(e.target.selectedOptions, option => option.value))
                            }
                        >
                            <option disabled value="">-- Select clients --</option>
                            {users.map(user => (
                                <option key={user._id} value={user._id}>
                                    {user.name} ({user.email})
                                </option>
                            ))}
                        </select>

                        <button type="submit" disabled={loading} className="add-user-button button">
                            {loading ? "Adding..." : "Add User"}
                        </button>
                    </form>
                </section>
            )}

            <div className="projects-data">
                {usersInProject.map(user => (
                    <p key={user._id} value={user._id}>
                        {user.name} ({user.email})
                    </p>
                ))}
                <p>Notifications</p>
                <p>Review history</p>

                <div className="project--chart">
                    <p>Progress</p>
                    <ProgressBarChart project={project} />
                </div>
            </div>

            <div className="project-tasklist">
                <div ref={projectTaskListRef}>
                    <TaskList tasks={selectedProject.tasks} projectId={selectedProject._id} />
                </div>
            </div>
        </article >
    );
}

export default ProjectDetail;