import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select"

import { AuthContext } from "../../context/AuthContext";
import { getClickUpSpaces } from "../../utils/clickup";
import projectService from "../../utils/projects";
import userService from "../../utils/user";
import "./createProjectForm.css";

function CreateProjectForm() {
    const { userData } = useContext(AuthContext);
    const userId = userData?._id;

    const [spaces, setSpaces] = useState([]);
    const [selectedSpace, setSelectedSpace] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const navigate = useNavigate();

    // GET CLICKUP SPACES:
    useEffect(() => {
        const fetchSpaces = async () => {
            try {
                const data = await getClickUpSpaces(userId);
                if (data.success) {
                    setSpaces(data.data);
                } else {
                    console.error("Can't get clickUp Spaces");
                }
            } catch (err) {
                console.error("Error getting the clickUp spaces:", err);
            }
        };

        if (userId) {
            fetchSpaces();
        }
    }, [userId]);


    // GET TERRA_VISTA CLIENTS:
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await userService.getAllUsers();
                if (Array.isArray(result)) {
                    const clients = result.filter(user => user.role === "client");
                    setUsers(clients);
                } else {
                    console.error("Can't get users");
                }
            } catch (err) {
                console.error("Error getting users: ", err);
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!projectName || !selectedSpace || selectedUsers.length === 0) {
            alert("Please fill in all the fields");
            return;
        }
        setLoading(true);

        try {
            const result = await projectService.createProject({
                name: projectName,
                clickUpSpaceId: selectedSpace,
            });

            if (result?.name && result?._id) {
                const projectId = result._id;

                for (const userId of selectedUsers) {
                    try {
                        await userService.addUserToProject(userId, projectId);
                    } catch (err) {
                        console.error(`Error adding user ${userId} to project`, err);
                    }
                }
                setShowSuccessModal(true);
            } else {
                alert("Error creating the project");
            }
        } catch (err) {
            console.error("Error creating the project", err);
            alert("Unexpected error");
        } finally {
            setLoading(false);
        }
    };

    const spaceOptions = spaces.map((space) => ({
        value: space.id,
        label: space.name,
    }));

    const userOptions = users.map((user) => ({
        value: user._id,
        label: `${user.name} (${user.email})`,
    }));


    return (
        <article className="create-project-form-page article">

                        {showSuccessModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>Project {projectName} successfully created! {userData.name} can now access to it. If you want to give access to more users, you can do it from the project page.</p>
                        <button className="button-modal" onClick={() => navigate("/project")}>Go to projects</button>
                    </div>
                </div>
            )}

            <section className="page-header">
                <h2 className="page-title">New<br />Project</h2>
            </section>

            <section className="page-content">
            
            <form onSubmit={handleSubmit}>
                <h2>Create a new project</h2>

                <label htmlFor="projectName">Name: </label>
                <input
                    type="text"
                    id="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                />

                    <label htmlFor="space">Select a clickUp Space: </label>
                    <Select
                        id="space"
                        options={spaceOptions}
                        value={spaceOptions.find(opt => opt.value === selectedSpace)}
                        onChange={(selectedOption) => setSelectedSpace(selectedOption?.value || "")}
                        placeholder="Select a clickUp Space"
                        isClearable
                    />

                    <label htmlFor="users">Select clients to add to this project: </label>
                    <Select
                        id="users"
                        options={userOptions}
                        value={userOptions.filter(opt => selectedUsers.includes(opt.value))}
                        onChange={(selectedOptions) =>
                            setSelectedUsers(selectedOptions.map(opt => opt.value))
                        }
                        isMulti
                        placeholder="Select clients"
                        isClearable
                    />

                    <button type="submit" disabled={loading} className="create-project-button button">
                        {loading ? "Creating..." : "Create Project"}
                    </button>
                </form>
            </section>
        </article>
    );
}

export default CreateProjectForm;