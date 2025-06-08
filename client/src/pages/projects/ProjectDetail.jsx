import { useLoaderData, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useRef } from "react";

import { AuthContext } from "../../context/AuthContext";
import TaskList from '../../components/taskList/TaskList'
import { useProject } from "../../context/ProjectContext";
import projectService from "../../utils/projects";
import "./ProjectDetail.css";

function ProjectDetail() {
    const navigate = useNavigate();
    const { selectedProject, setSelectedProject } = useProject();
    const projectTaskListRef = useRef(null);

    // SELECTED PROJECT
    useEffect(() => {
        if (!selectedProject) {
            navigate("/");
            return;
        }
        const fetchUpdatedProject = async () => {
            try {
                const updatedProject = await projectService.getProjectId(selectedProject._id);
                setSelectedProject(updatedProject);
            } catch (err) {
                console.error("Failed to reload project:", err);
            }
        };
        fetchUpdatedProject();
    }, [navigate]);


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
                        <h3>Your website is ready for you.</h3>
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

            <section className="projects-data"> {/* TODO COMPONENTS */}
                <p>Notifications</p>
                <p>Review history</p>
                <p>Progress</p>
            </section>

            <section className="project-tasklist"> {/* TODO COMPONENTS */}
                <div ref={projectTaskListRef}>
                    <h2>Issues</h2>
                    <TaskList tasks={selectedProject.tasks} projectId={selectedProject._id} />

                </div>
            </section>
        </article>
    );
}

export default ProjectDetail;