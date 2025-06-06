import { useLoaderData } from "react-router-dom";

import ProjectCard from "../projectCard/ProjectCard";
import './ProjectList.css';

function ProjectList({ projects = [] }) {
    projects = useLoaderData();
	console.log("ProjectList received:", projects);
    return (
        <article className="projects-list">
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