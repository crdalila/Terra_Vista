import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { ProjectContext } from "../../context/ProjectContext";

function RequestDetail() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { task, project } = state || {};
    const { userData } = useContext(AuthContext);
    const { selectedProject, setSelectedProject } = useContext(ProjectContext);

    return (
        <article className="request-detail article">
            <h2>Request #{task._id}</h2>

            <section className="request-detail__feedback">
                <div className="request-detail__feedback--status">
                    <h4>Status:</h4>
                    <p>{task.status}</p>
                </div>

                <div className="request-detail__feedback--comments">
                    <h4>Terra Comments:</h4>
 {/*                    {task.comments ? (
                        task.comments.map((c) => (
                            <div key={c._id} className="comment">
                                <p>({new Date(c.date).toLocaleDateString()}):</p>
                                <p>{c.comment}</p>
                            </div>
                    ))) */}
   {/*                  {Array.isArray(task.comments) && task.comments.length > 0 ? (
                        task.comments.map((c) => (
                            <div key={c._id} className="comment">
                                <p>({new Date(c.date).toLocaleDateString()}):</p>
                                <p>{c.comment}</p>
                            </div>
                        ))
                    )} */}
                </div>
            </section>

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
    )
}

export default RequestDetail;