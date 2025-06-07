import { Link } from "react-router-dom";
import { useContext } from "react";

import { ProjectContext } from "../../context/ProjectContext";
import "./TaskCard.css";

function TaskCard({ task }) {

    return (
        <article className="task">
            <Link to={`/issue`} state={{ task }}> {/* 👈 Pasamos la task por state */}
                <section className="task-id">
                    <p>#{task._id}</p>
                </section>

                <section className="task-request">
                    <h4>Name:</h4>
                    <p>{task.name}</p>
                </section>

                <section className="request-type">
                    <h4>Request Type:</h4>
                    <p>{task.requestType}</p>
                </section>

                <section className="task-date">
                    <p>{task.inputDate}</p>
                </section>

            </Link>
        </article>
    );
}

export default TaskCard;
