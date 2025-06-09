import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import taskService from "../../utils/tasks";
import { AuthContext } from "../../context/AuthContext";
import { ProjectContext } from "../../context/ProjectContext";
import "./RequestForm.css";

function RequestForm() {

    const navigate = useNavigate();
    const { state } = useLocation();
    const { task, project } = state || {};
    const { userData } = useContext(AuthContext);
    const { selectedProject, setSelectedProject } = useContext(ProjectContext);

    const isExisting = !!task;
    const [isEditing, setIsEditing] = useState(!isExisting);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    const [formData, setFormData] = useState({
        name: task?.name || "",
        requestType: task?.requestType || "",
        device: task?.device || "",
        browser: task?.browser || "",
        request: task?.request || "",
        page: task?.page || "",
        picture: task?.picture || "",
    });

    useEffect(() => {
        if (project) {
            setSelectedProject(project);
        }
    }, [project, setSelectedProject]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedProject || !userData) {
            console.error("Missing selectedProject or userData", selectedProject, userData);
            return;
        }

        setLoading(true);
        try {
            if (isExisting && isEditing) {
                await taskService.editTask(selectedProject._id, task._id, formData);
                alert("Request updated successfully"); // TODO otro tipo de alerta
            } else if (!isExisting) {
                await taskService.createTask(selectedProject._id, {
                    ...formData,
                    requester: userData.name
                });
                alert("Request created successfully"); // TODO otro tipo de alerta
            }
            navigate("/project", { state: { reaload: true } });
        } catch (err) {
            console.error("Error submitting task", err);
            alert("There was a problem submitting the request"); // TODO otro tipo de alerta
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="create-request article">
            <h3>{isExisting ? (isEditing ? "Edit Request" : "View Request") : "Create Request"}</h3>

            <form onSubmit={handleSubmit} className="request__form">
                <label htmlFor="name">Title:</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} disabled={!isEditing} required
                    placeholder="Please enter a title for your request" />

                <label htmlFor="request-type">Request Type:</label>
                <select name="requestType" id="request-type" value={formData.requestType} onChange={handleChange} disabled={!isEditing} required>
                    <option value="">-- Select a type --</option>
                    <option value="Copy Revision">Copy Revision</option>
                    <option value="Design Issues">Design Issues</option>
                    <option value="Requested Change">Requested Change</option>
                    <option value="New Item">New Item</option>
                </select>

                <label htmlFor="device">Device:</label>
                <select name="device" id="device" value={formData.device} onChange={handleChange} disabled={!isEditing} required>
                    <option value="">-- Select device --</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Mobile">Mobile</option>
                </select>

                <label htmlFor="browser">Browser:</label>
                <select name="browser" id="browser" value={formData.browser} onChange={handleChange} disabled={!isEditing} required>
                    <option value="">-- Select browser --</option>
                    <option value="chrome">Chrome</option>
                    <option value="firefox">Firefox</option>
                    <option value="safari">Safari</option>
                    <option value="other">Other</option>
                </select>

                <label htmlFor="request">Request:</label>
                <textarea name="request" id="request" value={formData.request} onChange={handleChange} disabled={!isEditing} required />

                <label htmlFor="page">Page:</label>
                <input type="url" name="page" id="page" value={formData.page} onChange={handleChange} disabled={!isEditing} required />

                <label htmlFor="picture">Screenshot:</label>
                <input type="file" accept="image/*" name="picture" id="picture" value={formData.picture} disabled={!isEditing}
                onChange={(e) => setImage(e.target.files[0])} />

                {isExisting && !isEditing && (
                    <button type="button" className="request-form-button" onClick={() => setIsEditing(true)}>Edit</button>
                )}

                {(isEditing || !isExisting) && (
                    <button type="submit" disabled={loading} className="request-form-button">
                        {loading ? "Submitting..." : (isExisting ? "Update" : "Create")}
                    </button>
                )}
            </form>
        </section>
    );
}

export default RequestForm;
