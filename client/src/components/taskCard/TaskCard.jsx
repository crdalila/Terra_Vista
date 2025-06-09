import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ProjectContext } from "../../context/ProjectContext";
import { AuthContext } from "../../context/AuthContext";
import taskUtils from "../../utils/tasks";
import "./TaskCard.css";

function TaskCard({ task, projectId }) {
    const { selectedProject, setSelectedProject } = useContext(ProjectContext);
    const [issueToDelete, setIssueToDelete] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRemoveIssue = async (taskId) => {
        try {
            console.log("attempting to remove task: ", taskId, "from project: ", projectId);
            const result = await taskUtils.removeTask(projectId, taskId);

            if (result.error) {
                setError(`Error removing issue: ${result.message} (status ${result.status})`);
            } else {
                setSelectedProject(prev => ({
                    ...prev,
                    tasks: prev.tasks.filter(task => task._id !== taskId),
                }));
                console.log("Task removed successfully");
            }
        } catch (error) {
            console.error("Error removing task: ", error);
            setError(`Error removing issue: ${error.message}`);
        }
    };


    return (
        <article className="task-card">

            {error && (
                <div className="error-message" style={{ color: 'red', fontSize: '12px' }}>
                    {error}
                </div>
            )}

            {/*LINK TO ISSUE*/}
            <div className="task-card__link">
                <Link to={`/request-detail`} state={{ task }}> {/* we use state to pass the task */}
                    <section className="task-name">
                        <h4>{task.name}</h4>
                        <p className="task-id">Request#{task._id}</p>
                    </section>

                    <img src="../../public/images/icons-instructions.png" alt="icons" className="icons-instructions" />

                    <section className="task-info">
                        {task.isSend ? "Sent" : "!Pending"}
                        <p>{task.requestType}</p>
                    </section>

                    <section className="task-date">
                        <p>{new Date(task.inputDate).toISOString().slice(0, 10).replaceAll("-", "/")}</p>

                    </section>
                </Link>
            </div>

            {/*DELETE BUTTON*/}
            <div className="task-card__trash">
                <button onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIssueToDelete(task);
                }}>
                    {" "}
                    <svg viewBox="0 0 448 512" fill="black" height="18px" width="18px"> <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                </button>
            </div>

            {/*CONFIRM DELETE*/}
            {issueToDelete && (
                <div
                    className="delete-confirmation"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (e.target.classList.contains("delete-confirmation")) {
                            setIssueToDelete(null);
                        }
                    }}
                >
                    <div
                        className="delete-confirmation__content"
                    >
                        <p>Are you sure you want to delete this request?</p>
                        <div className="delete-confirmation__buttons">
                            <button
                                className="button-cancel"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIssueToDelete(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="button-delete"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveIssue(task._id);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </article >
    );
}

export default TaskCard;
