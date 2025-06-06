import { useNavigate } from "react-router-dom";

import ProjectList from "../../components/projectList/ProjectList";

function Projects() {
    const navigate = useNavigate();

    return (
        <article className="projects article">
            <h1>Projects</h1>
            <ProjectList />
        </article>
    )
}

export default Projects;