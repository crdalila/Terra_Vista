import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "./TaskDetail.css";

function TaskDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const task = location.state?.task;

    useEffect(() => {
        if (!task) {
            navigate("/project");
        }
    }, [task, navigate]);

    if (!task) return null;

    return (
        <article className="task-detail article">
            <div className="page-header">
                <h1 className="page-title">ISSUE DETAIL</h1>

            </div>
            {/*             <section className="task-detail--buttons">
                <button className="button-edit-tasks">Update Tasks</button>
            </section> */}
            <section className="task-detail--info page-content">
                <h2>{task.name}</h2>
                <p><strong>Request:</strong> {task.request}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Device:</strong> {task.device}</p>
                <p><strong>Browser:</strong> {task.browser}</p>
                <p><strong>Page:</strong> {task.page}</p>
            </section>
        </article>
    );
}

export default TaskDetail;
