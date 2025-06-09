import { useLoaderData, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useRef } from "react";

import { AuthContext } from "../../context/AuthContext";
import { ProjectContext } from "../../context/ProjectContext";
import TaskList from '../../components/taskList/TaskList'
import { useProject } from "../../context/ProjectContext";
import projectService from "../../utils/projects";
import userService from '../../utils/user';
import './ProjectDetail.css';

import DoughnutChart from "../../components/doughnutChart/DoughnutChart";

function ProjectDetail() {
    const navigate = useNavigate();
    const project = useLoaderData();
    const { selectedProject, setSelectedProject } = useProject();
    const projectTaskListRef = useRef(null);

    const { userData } = useContext(AuthContext);

    const [users, setUsers] = useState([]);
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

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await userService.getAllUsers();
                if (Array.isArray(result)) {
                    const clients = result.filter(user => user.role === "client");
                    let clientsWithoutSelectedProject = [];
                    clients.forEach((client) => {
                        let isProjectAlreadyAdded = false;
                        client.projects.forEach((project) => {
                            if (project._id == selectedProject._id) {
                                isProjectAlreadyAdded = true;
                            }
                        });
                        if (!isProjectAlreadyAdded) {
                            clientsWithoutSelectedProject.push(client);
                        }
                    });
                    setUsers(clientsWithoutSelectedProject);
                } else {
                    console.error("Can't get users");
                }
            } catch (err) {
                console.error("Error getting users:", err);
            }
        };

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
        } catch (err) {
            console.error("Error adding users to project", err);
            alert("Failed to add users to the project.");
        }
    };


    return (
        <article className="project-page article">

            <section className="project-detail">
                <h2>{selectedProject.name}</h2>
                <div className="project-detail__info">
                    <div className="project-detail__info--text">
                        <h3>Your website is ready for you.</h3>
                        <p>Explore your website and observe the details.</p>
                        <Link to='/instructions' className="button">Instructions</Link>
                    </div>
                    {userData && userData.role === "projectManager" && (
                        <button className="add-user-to-project-button button" onClick={() => setShowAddUserForm(prev => !prev)}>{showAddUserForm ? "Cancel" : "Add User To Project"}</button>
                    )}
                    {showAddUserForm && (
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
                    )}


                    <div className="project-detail__info--icons">
                        <div className="project-detail__info--icon-list">
                            {/* <svg></svg>
                            <svg></svg>
                            <svg></svg> */}
                        </div>
                        <button className="start-project-button button" onClick={handleScrollToTasks}>Go to tasks</button>
                    </div>
                </div>
            </section>

            <section className="projects-data"> {/* TODO COMPONENTS */}
                <p>Notifications</p>
                <p>Review history</p>

                <div className="project--chart">
                    <p>Progress</p>
                    <DoughnutChart project={project} />
                </div>
            </section>

            <section className="project-tasklist"> {/* TODO COMPONENTS */}
                <div ref={projectTaskListRef}>
                    <h2>Issues</h2>
                    <TaskList tasks={selectedProject.tasks} projectId={selectedProject._id} />

                </div>
            </section>
        </article>
    );
}

export default ProjectDetail;