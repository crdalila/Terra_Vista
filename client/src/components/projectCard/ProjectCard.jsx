import { Link, useLoaderData } from "react-router-dom";

import './ProjectCard.css';

function ProjectCard({ project }) {
	project = useLoaderData();
	console.log("ProjectCard received:", project);

	return (
		<article className="project">
			<Link to={`/project`}>
				<section className="project-data">
					<h2>Nombre de proyecto: {project.name}</h2>
                    <p>PORCENTAJE PROYECTO</p> {/* TODO CHARTJS */}
				</section>
			</Link>
		</article >
	)
}

export default ProjectCard;