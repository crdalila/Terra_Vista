import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { ProjectContext } from "../../context/ProjectContext";
import { sendCommentToClickUp } from "../../utils/clickup";
import "./RequestDetail.css";

function RequestDetail() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { task, project } = state || {};
    const { userData } = useContext(AuthContext);
    const { selectedProject, setSelectedProject } = useContext(ProjectContext);

    const [newComment, setNewComment] = useState("");

    const handleSendComment = async () => {
        if (!newComment.trim()) return;

        try {
            await sendCommentToClickUp(task.clickUpTaskId, newComment);
            alert("Comment sent to ClickUp!");
            setNewComment("");
            navigate(0);
        } catch (err) {
            console.error(err);
            alert("Failed to send comment to ClickUp");
        }
    };

    return (
        <article className="request-detail article">
            <section className="page-header">
                <h2 className="page-title">Request</h2>

                <div className="page-info">
                    <h3>{task.name}</h3>
                    <p>Request #{task._id}</p>
                </div>

                <button className="back-button" onClick={() => navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
                        <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753" />
                    </svg>
                </button>
            </section>

            <section className="page-content">
                <div className="request-info">
                    {/* Solo mostramos si hay comentarios */}
                    {Array.isArray(task.comments) && task.comments.length > 0 && (
                        <div className="request-detail__feedback">
                            <h3>Terra Comments:</h3>

                            {task.comments.map((c) => (
                                <div key={c._id} className="comment">
                                    <p><strong>{new Date(c.date).toLocaleDateString()}</strong>:</p>
                                    <p>{c.comment}</p>
                                </div>
                            ))}

                            <div className="add-comment">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add a comment..."
                                />
                                <button className="button-sendComment" onClick={handleSendComment}>Send</button>
                            </div>
                        </div>
                    )}

                    <div className="request-detail__info">
                        <div className="request-detail__title">
                            <h3>Request Info</h3>

                            <img src="../../public/images/icons-card.png" alt="icons" className="icons-card" />
                        </div>

                        <h4>Project:</h4>
                        <p>{task.name}</p>

                        <h4>Request Type:</h4>
                        <p>{task.requestType}</p>

                        <h4>Device:</h4>
                        <p>{task.device}</p>

                        <h4>Browser:</h4>
                        <p>{task.browser}</p>

                        <h4>Request:</h4>
                        <p>{task.request}</p>

                        <h4>Page:</h4>
                        <p>{task.page}</p>

                        {task.picture && (
                            <div className="request-detail__picture">
                                <h4>Screenshot:</h4>
                                <p>{task.picture}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </article>
    );
}

export default RequestDetail;
