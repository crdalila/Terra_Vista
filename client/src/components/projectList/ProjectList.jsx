import { Link, useLoaderData } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import ProjectCard from "../projectCard/ProjectCard";
import './ProjectList.css';

function ProjectList({ projects = [] }) {
    const { userData } = useContext(AuthContext);
    projects = useLoaderData();

    const canCreateProject =
        userData && userData.role === "admin" || userData.role === "projectManager";
    
    
    return (
        <article className="projects-list">
            
            {canCreateProject && (
                <Link to="/create-project">
                    <button className="create-project-button">Add Project From ClickUp</button>
                </Link>
            )}

            <section className="projects-list--projects">
                {projects.length === 0 ? (
                    <p>You have no projects in progress.</p>
                ) : (
                    projects.map((project) => (
						<ProjectCard project={project} key={project._id} />
                    ))
                )}
            </section>

        </article>
    )
}

export default ProjectList;