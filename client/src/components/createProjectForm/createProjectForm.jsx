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
    const [projectDescription, setProjectDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const randomIconIndex = Math.floor(Math.random() * 12) + 1;
	const iconPath = `/images/threeIcons/${randomIconIndex}.svg`;

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

        if (!projectName || !projectDescription || !selectedSpace || selectedUsers.length === 0) {
            alert("Please fill in all the fields");
            return;
        }
        setLoading(true);

        try {
            const result = await projectService.createProject({
                name: projectName,
                description: projectDescription,
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
                        <p>Project {projectName} successfully created! If you want to give access to more users, you can do it from the project page.</p>
                        <button className="button-modal button" onClick={() => navigate("/")}>Go to projects<i>!</i></button>
                    </div>
                </div>
            )}

            <section className="page-header">
                <h2 className="page-title">New<br />Project</h2>

                <button className="back-button" onClick={() => navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
                        <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753" />
                    </svg>
                </button>
            </section>

            <section className="page-content">

                <form onSubmit={handleSubmit} className="create-project-form">
                    <h2>Create a new project</h2>
                    <img src={iconPath} alt={`icon-${randomIconIndex}`} className="project--icons" />

                    <label htmlFor="projectName">Name*: </label>
                    <input
                        type="text"
                        id="projectName"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                    />
                    <label htmlFor="projectDescription">Description*: </label>
                    <input
                        type="text"
                        id="projectDescription"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        required
                    />

                    <label htmlFor="space">Select a clickUp Space*: </label>
                    <Select
                        id="space"
                        styles={customSelectStyles}
                        options={spaceOptions}
                        value={spaceOptions.find(opt => opt.value === selectedSpace)}
                        onChange={(selectedOption) => setSelectedSpace(selectedOption?.value || "")}
                        placeholder="Select a clickUp Space"
                        isClearable
                    />

                    <label htmlFor="users">Select clients to add to this project*: </label>
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

                    <button type="submit" disabled={loading} className="create-project-button button">
                        {loading ? "Creating..." : "Create Project"}
                    </button>
                </form>
            </section>
        </article>
    );
}

export default CreateProjectForm;