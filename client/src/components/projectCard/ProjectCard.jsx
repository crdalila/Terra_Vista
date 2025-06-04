import { Link } from "react-router-dom";
import { projects } from "../../utils/fakeData";

// import './ProjectCard.css';

function ProjectCard({ project }) {
	return (
		<article className="project">
			<Link to={`/projects/${project._id}`}>
				<section className="project-data">
					<h2>{projects[0].Name}</h2>
                    <p>PORCENTAJE PROYECTO</p> {/* TODO CHARTJS */}
				</section>
			</Link>
		</article >
	)
}

export default ProjectCard;