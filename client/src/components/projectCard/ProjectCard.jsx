import { Link } from "react-router-dom";
import { useContext } from "react";

import DoughnutChart from "../doughnutChart/DoughnutChart";

import { ProjectContext } from "../../context/ProjectContext";

import './ProjectCard.css';

function ProjectCard({ project }) {
	const { setSelectedProject } = useContext(ProjectContext);

	// SAVES THE SELECTED PROJECT IN PROJECT CONTEXT
	const handleClick = () => {
		setSelectedProject(project);
	}

	return (
		<Link to={`/project`} onClick={handleClick} className="project">
			<div className="project--info">
				<h3>{project.name}</h3>
				<img src="../../../public/images/icons-card.png" alt="" />
				<p>{project.description}</p> {/* TODO ADD DESCRIPTION */}
			</div>
			<div className="project--chart">
				<DoughnutChart project={project} />
			</div>
		</Link>
	)
}

export default ProjectCard;