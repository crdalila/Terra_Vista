import { Link, useLoaderData } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import ProjectCard from "../projectCard/ProjectCard";
import './ProjectList.css';

function ProjectList() {
    const { userData } = useContext(AuthContext);
    const projects = useLoaderData();
    return (
        <article className="projects-list">
            <section className="projects-list--projects">
                {projects.length === 0 ? (
                    <p>You have no projects in progress.</p>
                ) : (
                    projects.toReversed().map((project) => (
                        <ProjectCard project={project} key={project._id} />
                    ))
                )}
            </section>

        </article>
    )
}

export default ProjectList;