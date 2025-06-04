
import TaskCard from "../taskCard/TaskCard";

// import './TaskList.css';


function TaskList({ tasks = [] }) {

    return (
        <article className="tasks-list">
            <section className="tasks-list--tasks">
                {tasks.map((project) => ( <TaskCard project={project} key={project._id} />))}
                <div className="tasks-buttons">
                    <button className="create-task">Create Task</button>
                    {/* <button className="done-task">Done Tasks</button> */}
                </div>
            </section>
        </article>
    )
}

export default TaskList;