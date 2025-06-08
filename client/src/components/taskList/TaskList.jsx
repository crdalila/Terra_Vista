import { Link } from "react-router-dom";
import { useContext } from "react";

import { ProjectContext } from "../../context/ProjectContext";
import { AuthContext } from "../../context/AuthContext";
import TaskCard from "../taskCard/TaskCard";
import "./TaskList.css";

function TaskList({ tasks = [], projectId }) {
    const { userData } = useContext(AuthContext);

    // Show only if it's client
    const isClient = userData && userData.role === "client";

    const handleFeedback = () => {
        //TODO llamar a enviar feedback de tasks que conecta con CLickup
    }

    return (
        <article className="tasks-list">

            {isClient && (
                <section className="tasks-list--buttons">

                    <button onClick={handleFeedback} className="button-feedback">Send Feedback</button>

                    <div className="tasks-buttons">
                        <Link to="/create-issue">
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
