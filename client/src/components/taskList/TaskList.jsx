import { Link } from "react-router-dom";
import { useContext } from "react";

import { ProjectContext } from "../../context/ProjectContext";
import { AuthContext } from "../../context/AuthContext";
import TaskCard from "../taskCard/TaskCard";
import "./TaskList.css";
import { sendFeedback } from "../../utils/clickup";

function TaskList({ tasks = [], projectId }) {
    const { userData } = useContext(AuthContext);
    const { selectedProject } = useContext(ProjectContext);
    const issuesNotSent = tasks.filter(task => task.isSend === "false"); //ARRAY?

    // Show only if it's client
    const isClient = userData && userData.role === "client";

    const handleFeedback = () => {
        try {
            sendFeedback(userData._id, issuesNotSent);
            alert ("Feedback sent successfully");
        } catch (err) {
            console.error("Error sending feedback", err);
        }
    }

    return (
        <article className="tasks-list">

            {isClient && (
                <section className="tasks-list--buttons">

                    <button onClick={handleFeedback} className="button-feedback">Send Feedback</button>

                    <div className="tasks-buttons">
                        <Link to="/request" state={{ project: selectedProject }}>
                            <button className="button-create-task">+ Create Request</button>
                        </Link>
                    </div>
                </section>
            )}

            <section className="tasks-list--tasks">
                {tasks.length === 0 ? (
                    <p>You have no tasks for this project yet.</p>
                ) : (
                    tasks.map(task =>
                        <TaskCard task={task} key={task._id} projectId={projectId} />)
                )}
            </section>

        </article>
    );
}

export default TaskList;
