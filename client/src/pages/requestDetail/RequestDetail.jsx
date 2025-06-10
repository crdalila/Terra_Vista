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
                        <h3>Request Info</h3>

                        <img src="../../public/images/icons-card.png" alt="icons" className="icons-card" />

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

                        {task.screenshots && (
                            <div className="request-detail__picture">
                                <h4>Screenshot:</h4>
                                <p>{task.screenshots}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </article>
    );
}

export default RequestDetail;
