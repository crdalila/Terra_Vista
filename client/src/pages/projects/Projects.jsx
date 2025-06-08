import ProjectList from "../../components/projectList/ProjectList";
import "./Projects.css"

function Projects() {

    return (
        <article className="projects article">
            <div className="projects-header">
                <h1>Projects</h1>
            </div>
            <ProjectList />
        </article>
    )
}

export default Projects;