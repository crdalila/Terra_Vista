import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { getClickUpSpaces } from "../../utils/clickup";
import projectService from "../../utils/projects";
import "./createProjectForm.css";

function CreateProjectForm() {
    const { userData } = useContext(AuthContext);
    const userId = userData?._id;

    const [spaces, setSpaces] = useState([]);
    const [selectedSpace, setSelectedSpace] = useState("");
    const [projectName, setProjectName] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await projectService.createProject({
                name: projectName,
                clickUpSpaceId: selectedSpace,
            });

            if (result?.name && result?._id) {
                alert("Project created successfully");
                navigate(`/`);
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

    return (
        <article className="create-project-form article">
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
                <select
                    id="space"
                    value={selectedSpace}
                    onChange={(e) => setSelectedSpace(e.target.value)}
                    required>
                    <option value="">-- Select a space --</option>
                    {spaces.map((space) => (
                        <option key={space.id} value={space.id}>
                            {space.name}
                        </option>
                    ))}
                </select>

                <button type="submit" disabled={loading} className="create-project-button">
                    {loading ? "Creating..." : "Create Project"}
                </button>
            </form>
        </article>
    );
}

export default CreateProjectForm;