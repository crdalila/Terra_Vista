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
                    <h3>Your website is ready for you<i>!</i></h3>
                    <p>Explore your website and observe the details.</p>
                    <button className="start-project-button button" onClick={handleScrollToTasks}>Go to tasks<i>!</i></button>
                </div>
            </section>

            <section className="page-content">
                {usersInProject.map(user => (
                    <div className="project-user">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="var(--text-color)" width='24' height='24'>
                            <path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                        </svg>
                        <p key={user._id} value={user._id}>
                            {user.name} ({user.email})
                        </p>
                    </div>
                ))}

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

                <div className="projects-data"> {/* TODO COMPONENTS */}
                    <h3>Notifications</h3>
                    <h3>Review history</h3>
                </div>

                <div className="project-detail--chart">
                    <h3>Progress</h3>
                    <ProgressBarChart project={selectedProject} />
                </div>

                <div className="project-tasklist">
                    <div ref={projectTaskListRef}>
                        <TaskList tasks={selectedProject.tasks} projectId={selectedProject._id} />
                    </div>
                </div>

            </section>
        </article >
    );
}

export default ProjectDetail;