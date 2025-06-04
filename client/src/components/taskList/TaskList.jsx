
import TaskCard from "../taskCard/TaskCard";
import { projects, tasks } from "../../utils/fakeData";

// import './TaskList.css';


function TaskList({ tasks = [] }) {
    const project = projects[0];

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