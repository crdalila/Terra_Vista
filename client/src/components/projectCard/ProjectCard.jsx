import { Link } from "react-router-dom";

// import './ProjectCard.css';

function ProjectCard({ project }) {
	return (
		<article className="project">
			<Link to={`/projects/${project._id}`}>
				<section className="project-image">
					<img src={project.Image} alt={project.Name} />
				</section>

				<section className="project-data">
					<h2>{project.Name}</h2>
                    <p>PORCENTAJE PROYECTO</p> {/* TODO CHARTJS */}
				</section>
			</Link>
		</article >
	)
}

export default ProjectCard;