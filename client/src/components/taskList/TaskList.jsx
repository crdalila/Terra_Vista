import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { ProjectContext } from "../../context/ProjectContext";
import { AuthContext } from "../../context/AuthContext";
import TaskCard from "../taskCard/TaskCard";
import { sendFeedback } from "../../utils/clickup";
import Modal from "../Modal/Modal";
import "./TaskList.css";

function TaskList({ tasks = [], projectId }) {
    const { userData } = useContext(AuthContext);
    const { selectedProject, setSelectedProject } = useContext(ProjectContext);
    const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const isClient = userData && userData.role === "client";

    const handleFeedback = async () => {
        try {
            await sendFeedback(userData._id);
            setModalMessage("Feedback sent successfully!");
        } catch (err) {
            console.error("Error sending feedback", err);
            setModalMessage("Oh no! There was an error sending your feedback. Please try again.");
        } finally {
            setShowModal(true);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        window.location.reload();
    };

    return (
        <article className="tasks-list">
            <section className="tasks-list--title">
                <h3>Issues</h3>

                {isClient && (
                    <section className="tasks-list--buttons">
                        <button onClick={handleFeedback} className="button-feedback button">Send Feedback<i>!</i></button>


                        <Link to="/request" className="button-create-task button">Create Request</Link>
                    </section>
                )}
            </section>

            <section className="tasks-list--tasks">
                {tasks.length > 0 && (
                    tasks.map(task => (
                        <TaskCard task={task} key={task._id} projectId={projectId} />
                    ))
                )}
            </section>

            {showModal && <Modal message={modalMessage} onClose={handleModalClose} />}
        </article>
    );
}

export default TaskList;
