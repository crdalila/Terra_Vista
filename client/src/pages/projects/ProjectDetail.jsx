import { useLoaderData, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useRef } from "react";

import { AuthContext } from "../../context/AuthContext";
import TaskList from '../../components/taskList/TaskList'
import { useProject } from "../../context/ProjectContext";
import "./ProjectDetail.css";

function ProjectDetail() {
    const navigate = useNavigate();
    const { selectedProject } = useProject();
    const projectTaskListRef = useRef(null);

    // SELECTED PROJECT
    useEffect(() => {
        if (!selectedProject) {
            navigate("/"); //redirects if project is not selected
        }
    }, [selectedProject, navigate]);

    if (!selectedProject) return null;

    // SCROLL TO TASKS
    const handleScrollToTasks = () => {
        projectTaskListRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <article className="project-page article">

            <section className="project-detail">
                <h1>{selectedProject.name}</h1>
                <div className="project-detail__info">
                    <div className="project-detail__info--text">
                        <h2>Your website is ready for you.</h2>
                        <p>Explore your website and observe the details.</p>
                        <Link to='/instructions'>Read more</Link>
                    </div>

                    <div className="project-detail__info--icons">
                        <div className="project-detail__info--icon-list">
                            {/* <svg></svg>
                            <svg></svg>
                            <svg></svg> */}
                        </div>
                        <button className="start-project-button" onClick={handleScrollToTasks}>Go to tasks</button>
                    </div>
                </div>
            </section>

            <section className="project-data"> {/* TODO COMPONENTS */}
                <p>Notifications</p>
                <p>Review history</p>
                <p>Progress</p>
            </section>

            <section className="project-tasklist"> {/* TODO COMPONENTS */}
                <div ref={projectTaskListRef}>
                    <p>Tasks</p>
                    {/*  <TaskList /> */}
                </div>
            </section>
        </article>
    );
}

export default ProjectDetail;