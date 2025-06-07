
import TaskCard from "../taskCard/TaskCard";

import { useLoaderData } from "react-router-dom";

// import './TaskList.css';


function TaskList({ tasks = [] }) {
    tasks = useLoaderData();

    return (
        <article className="tasks-list">
            <section className="tasks-list--tasks">
                {tasks.length === 0 ? (
                    <p>You have no tasks for this project yet.</p>
                ) : (
                    tasks.map((project) => ( 
                        <TaskCard project={project} key={project._id} />))
                
                )}
                <div className="tasks-buttons">
                    <button className="create-task">Create Task</button>
                    <button className="update-tasks">Update Tasks</button>
                    {/* <button className="done-task">Done Tasks</button> */}
                </div>
            </section>
        </article>
    )
}

export default TaskList;