import { useLoaderData, useNavigate } from "react-router-dom";
import { use, useContext, useEffect, useState } from "react";
import Select from "react-select"
import { useRef } from "react";

import { AuthContext } from "../../context/AuthContext";
import TaskList from '../../components/taskList/TaskList'
import { useProject } from "../../context/ProjectContext";
import projectService from "../../utils/projects";
import userService from '../../utils/user';

import './ProjectDetail.css';
import UserCard from "../../components/userCard/UserCard";


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
    const [finalize, setFinalize] = useState(null);

    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const randomIconIndex = Math.floor(Math.random() * 12) + 1;
    const iconPath = `/images/threeIcons/${randomIconIndex}.svg`;

    const colorList = ['#FFB41D', '#F96E43', '#3D9DD8', '#F78BD8', '#189B5C', '#7CE55E'];
	const randomColor = colorList[Math.floor(Math.random() * colorList.length)];

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
        const completedTasks = project.tasks.filter(task => task.status == "Complete").length;
        const percentage = Math.round((completedTasks / totalTasks) * 100);

        return (
            <div className="progress-container" style={{'--random-color': randomColor}}>
                <div className="progress-bar" style={{ width: `${percentage}%`, '--random-color': randomColor  }} />
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

    const handleRemoveUserFromProject = async (userId) => {
        try {
            const result = await userService.removeUserFromProject(userId, selectedProject._id);

            if (result.error) {
                setError(`Error removing user: ${result.message} (status ${result.status})`);
            } else {
                fetchUsers();
            }
        } catch (error) {
            setError(`Error removing user: ${error.message}`);
        }
        setUserToDelete(null);
    };

    const handleFinalizeProject = async () => {
        try {
            const result = await projectService.finalizeProject(selectedProject._id);
            window.location.reload();
            if (result.error) {
                setError(`Error finalizing project: ${result.message} (status ${result.status})`);
            } else {
                fetchUsers();
            }
        } catch (error) {
            setError(`Error  finalizing project: ${error.message}`);
        }
    }

    const userOptions = users.map((user) => ({
        value: user._id,
        label: `${user.name} (${user.email})`,
    }));

    const customSelectStyles = {
        control: (provided, state) => ({
            ...provided,
            border: "none",
            boxShadow: "none",
            backgroundColor: "var(--main-color)",
            borderRadius: "40px",
            padding: ".5em 1em",
            fontFamily: "var(--main-font)",
            fontSize: "var(--main-font-size)",
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "var(--text-color)",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "var(--text-color)",
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: "var(--items-color)",
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: "var(--text-color)",
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: "var(--text-color)",
            ':hover': {
                backgroundColor: 'var(--text-color)',
                color: 'var(--main-color)',
            }
        }),
    };

    console.log("Finalize",finalize);
    return (
        <article className="project-page article">
            <section className="page-header">
                <h2 className="page-title">{selectedProject.name}</h2>
                <div className="page-info">
                    <h3>Your website is ready for you<i>!</i></h3>
                    <p>Explore your website and observe the details.</p>
                    <button className="start-project-button button" onClick={handleScrollToTasks}>Go to tasks<i>!</i></button>
                    {!selectedProject.isFinalize && <button className="start-project-button button" onClick={ ()=>{setFinalize(true)}}>Finalize Project<i>!</i></button>}
                </div>

                <button className="back-button" onClick={() => navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
                        <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753" />
                    </svg>
                </button>
            </section>

            <section className="page-content">
                {userData && userData.role !== "client" && !selectedProject.isFinalize && (
                    <>
                        <div className="project-users">
                            {usersInProject.map(user => (
                                <UserCard key={user._id} user={user} onRemoveUser={handleRemoveUserFromProject}
                                    text={"Are you sure you want to delete this user from the project?"} />
                            ))}
                        </div>

                        <form className="add-user-to-project-form" onSubmit={handleAddUsersToProject}>
                            <label htmlFor="users">Select clients to add to this project: </label>
                            <img src={iconPath} alt={`icon-${randomIconIndex}`} className="project--icons" />

                            <Select
                                id="users"
                                styles={customSelectStyles}
                                options={userOptions}
                                value={userOptions.filter(opt => selectedUsers.includes(opt.value))}
                                onChange={(selectedOptions) =>
                                    setSelectedUsers(selectedOptions.map(opt => opt.value))
                                }
                                isMulti
                                placeholder="Select clients"
                                isClearable
                            />

                            <button type="submit" disabled={loading} className="add-user-button button">
                                {loading ? "Adding..." : "Add User"}
                            </button>
                        </form>
                    </>
                )}

                {/* <div className="projects-data">
                    <div className="projects-data--item">
                        <h3>Notifications</h3>
                        <p>Stay on top of what is important, without distractions.</p>
                    </div>
                    <div className="projects-data--item">
                        <h3>Review history</h3>
                        <p>Keep track of all your project updates.</p>
                    </div>
                </div> */}

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
            {finalize && (
                <div className="delete-confirmation" onClick={() => setFinalize(null)}>
                    <div className="delete-confirmation__content" onClick={(e) => e.stopPropagation()}>
                        <p>Are you sure you want to finalize this project?</p>
                        <div className="delete-confirmation__buttons">
                            <button onClick={() => setFinalize(null)} className="button-cancel">
                                Cancel
                            </button>
                            <button onClick={handleFinalizeProject} className="button-delete">
                                Finalize
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </article >
    );
}

export default ProjectDetail;