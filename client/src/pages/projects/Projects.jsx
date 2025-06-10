import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import ProjectList from "../../components/projectList/ProjectList";
import "./Projects.css"

function Projects() {
    const { userData } = useContext(AuthContext);
    const canCreateProject =
        userData && userData.role === "admin" || userData.role === "projectManager";

    return (
        <article className="projects article">
            <div className="projects-header page-header">
                <h2 className="page-title">Projects</h2>

                <div className="page-info">
                    <h3>View, organize, and follow up on all your projects.</h3>
                    <p>Easily access all active projects, categorized by priority, status, and the team. You can track
                        progress, attach documents, and collaborate in real time, all connected to your ClickUp
                        workspace.</p>
                    <div className="page-buttons">
                        {canCreateProject && (
                            <Link to="/create-project" className="create-project-button button">Add Project From ClickUp<i>!</i></Link>
                        )}
                    </div>
                </div>
            </div>
            <div className="page-content">
                <ProjectList />
            </div>
        </article>
    )
}

export default Projects;