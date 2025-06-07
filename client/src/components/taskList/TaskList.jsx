import TaskCard from "../taskCard/TaskCard";
import "./TaskList.css";

function TaskList({ tasks = [] }) {
    return (
        <article className="tasks-list">
            <section className="tasks-list--tasks">
                <div className="tasks-buttons">
                    <button className="button-create-task">Create Task</button>
                    <button className="button-delete-task">Delete Tasks</button>
                    {/*<button className="done-tasks">Done Tasks</button>*/}
                </div>

                {tasks.length === 0 ? (
                    <p>You have no tasks for this project yet.</p>
                ) : (
                    tasks.map(task => <TaskCard task={task} key={task._id} />)
                )}

            </section>
        </article>
    );
}

export default TaskList;
