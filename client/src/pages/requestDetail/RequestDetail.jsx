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

    const handleSendComment = () => {
        try {
            sendCommentToClickUp(task._id, newComment);
            alert("Comment sent successfully");
        } catch (err) {
            console.error("Error sending comment", err);
            alert("There was a problem sending the comment");
        }
        setNewComment("");
    };

    return (
        <article className="request-detail article">
            <h2>Request #{task._id}</h2>

            {/* Solo mostramos si hay comentarios */}
            {Array.isArray(task.comments) && task.comments.length > 0 && (
                <section className="request-detail__feedback">
                    <h4>Terra Comments:</h4>

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
                </section>
            )}

            <section className="request-detail__info">
                <h3>Request Info</h3>
                <p><strong>Project: </strong> {task.name}</p>
                <p><strong>Request Type: </strong> {task.requestType}</p>
                <p><strong>Device:</strong> {task.device}</p>
                <p><strong>Browser:</strong> {task.browser}</p>
                <p><strong>Request: </strong> {task.request}</p>
                <p><strong>Page:</strong> {task.page}</p>
                <p><strong>Screenshot: </strong> {task.picture}</p>
            </section>
        </article>
    );
}

export default RequestDetail;
