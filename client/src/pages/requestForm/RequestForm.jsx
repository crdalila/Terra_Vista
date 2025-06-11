import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import taskService from "../../utils/tasks";
import { AuthContext } from "../../context/AuthContext";
import Modal from "../../components/Modal/Modal";
import { ProjectContext } from "../../context/ProjectContext";
import "./RequestForm.css";

function RequestForm() {

    const navigate = useNavigate();
    const { state } = useLocation();
    const { task, project } = state || {};
    const { userData } = useContext(AuthContext);
    const { selectedProject, setSelectedProject } = useContext(ProjectContext);
	const [modalMessage, setModalMessage] = useState("");
	const [showModal, setShowModal] = useState(false);

    const isExisting = !!task;
    const [isEditing, setIsEditing] = useState(!isExisting);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    const randomIconIndex = Math.floor(Math.random() * 12) + 1;
	const iconPath = `/images/threeIcons/${randomIconIndex}.svg`;

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
                await taskService.editTask(selectedProject._id, task._id, {
                    ...formData,
                    requester: userData.name
                });
                setModalMessage("Request updated successfully");
            } else if (!isExisting) {
                const taskPayload = {
                    ...formData,
                    requester: userData.email
                };
                if (image) {
                    await taskService.createTaskWithImage(selectedProject._id, taskPayload, image);
                } else {
                    await taskService.createTask(selectedProject._id, taskPayload);
                }
                setModalMessage("Request created successfully");
            }
            navigate("/project", { state: { reaload: true } });
        } catch (err) {
            console.error("Error submitting task", err);
            setModalMessage("There was a problem submitting the request");
        } finally {
			setShowModal(true);
            setLoading(false);
        }
    };

	const handleModalClose = () => {
        setShowModal(false);
        window.location.reload();
    };

    return (
        <article className="create-request article">
            <section className="page-header">
                <h2 className="page-title">{isExisting ? (isEditing ? "Edit Request" : "View Request") : "Create Request"}</h2>
            </section>

            <section className="page-content">
                <form onSubmit={handleSubmit} className="request__form">
                    <h3>Request</h3>
                    <img src={iconPath} alt={`icon-${randomIconIndex}`} className="project--icons" />

                    <label htmlFor="name">Title*:</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} disabled={!isEditing} required
                        placeholder="Please enter a title for your request" />

                    <label htmlFor="request-type">Request Type*:</label>
                    <select name="requestType" id="request-type" value={formData.requestType} onChange={handleChange} disabled={!isEditing} required>
                        <option value="">-- Select a type --</option>
                        <option value="Copy Revision">Copy Revision</option>
                        <option value="Design Issues">Design Issues</option>
                        <option value="Requested Change">Requested Change</option>
                        <option value="New Item">New Item</option>
                    </select>

                    <label htmlFor="device">Device*:</label>
                    <select name="device" id="device" value={formData.device} onChange={handleChange} disabled={!isEditing} required>
                        <option value="">-- Select device --</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Tablet">Tablet</option>
                        <option value="Mobile">Mobile</option>
                    </select>

                    <label htmlFor="browser">Browser*:</label>
                    <select name="browser" id="browser" value={formData.browser} onChange={handleChange} disabled={!isEditing} required>
                        <option value="">-- Select browser --</option>
                        <option value="chrome">Chrome</option>
                        <option value="firefox">Firefox</option>
                        <option value="safari">Safari</option>
                        <option value="other">Other</option>
                    </select>

                    <label htmlFor="request">Request*:</label>
                    <textarea name="request" id="request" value={formData.request} onChange={handleChange} disabled={!isEditing} required />

                    <label htmlFor="page">Page*:</label>
                    <input type="url" name="page" id="page" value={formData.page} onChange={handleChange} disabled={!isEditing} required />

                    <label htmlFor="picture" id="custom-file-upload" className="button">
                        Upload Image<i>!</i>
                    </label>
                    <input
                        type="file"
                        accept="image/jpeg, image/png, image/jpg, image/webp"
                        name="picture"
                        id="picture"
                        style={{ display: 'none' }}
                        disabled={!isEditing}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
                                if (!validTypes.includes(file.type)) {
                                    alert("Only JPG, JPEG, PNG and WEBP images are allowed.");
                                    e.target.value = null;
                                    return;
                                }
                                if (file.size > 10 * 1024 * 1024) {
                                    alert("File too large. Maximum allowed size is 10 MB.");
                                    e.target.value = null;
                                    return;
                                }
                                setImage(file);
                            }
                        }}
                    />

                    {isExisting && !isEditing && (
                        <button type="button" className="request-form-button button" onClick={() => setIsEditing(true)}>Edit</button>
                    )}

                    {(isEditing || !isExisting) && (
                        <button type="submit" disabled={loading} className="request-form-button button">
                            {loading ? "Submitting..." : (isExisting ? "Update" : "Create")}
                        </button>
                    )}
                </form>
            </section>

			{showModal && <Modal message={modalMessage} onClose={handleModalClose} />}
        </article>
    );
}

export default RequestForm;
