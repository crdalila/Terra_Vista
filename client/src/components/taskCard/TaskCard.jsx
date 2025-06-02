import { Link } from "react-router-dom";

// import './TaskCard.css';

function TaskCard({ task }) {
	return (
		<article className="task">
			<Link to={`/tasks/${task._id}`}>
                <section className="request-type">
                    <h2>Request Type:</h2>
                    <p>{task.requestType}</p>
                </section>

                <section className="task-request">
                    <h2>Request:</h2>
                    <p>{task.request}</p>
                </section>
			</Link>
		</article >
	)
}

export default TaskCard;