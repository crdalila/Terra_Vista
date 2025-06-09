import { Link } from "react-router-dom";
import { useContext } from "react";

import { ProjectContext } from "../../context/ProjectContext";
import { AuthContext } from "../../context/AuthContext";
import TaskCard from "../taskCard/TaskCard";
import "./TaskList.css";
import { sendFeedback } from "../../utils/clickup";

function TaskList({ tasks = [], projectId }) {
    const { userData } = useContext(AuthContext);
    const { selectedProject, setSelectedProject } = useContext(ProjectContext);
    const isClient = userData && userData.role === "client";

    const handleFeedback = async () => {
        try {
            await sendFeedback(userData._id);
            alert ("Feedback sent successfully");
        } catch (err) {
            console.error("Error sending feedback", err);
            alert("There was a problem sending the feedback");
        }
    }

    return (
        <article className="tasks-list">
            <section className="tasks-list--title">
                <h2>Issues</h2>

                {isClient && (
                    <section className="tasks-list--buttons">
                        <button onClick={handleFeedback} className="button-feedback button">Send Feedback</button>

                        <Link to="/create-issue" className="button-create-task button">+ Create Request</Link>
                    </section>
                )}
            </section>

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
