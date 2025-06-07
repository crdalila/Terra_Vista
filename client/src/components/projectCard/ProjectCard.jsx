import { Link } from "react-router-dom";
import { useContext } from "react";

import DoughnutChart from "../doughnutChart/DoughnutChart";

import { ProjectContext } from "../../context/ProjectContext";

import './ProjectCard.css';

function ProjectCard({ project }) {
	const {setSelectedProject} = useContext(ProjectContext);

	// SAVES THE SELECTED PROJECT IN PROJECT CONTEXT
	const handleClick = () => {
		setSelectedProject(project);
	}

	return (
		<article className="project">
			<Link to={`/project`} onClick={handleClick}>
				<section className="project-data">
					<h2>{project.name}</h2>
					<div className="chart">
						<DoughnutChart project={project} />
					</div>
				</section>
			</Link>
		</article >
	)
}

export default ProjectCard;