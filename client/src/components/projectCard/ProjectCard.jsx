import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import DoughnutChart from "../doughnutChart/DoughnutChart";

import { ProjectContext } from "../../context/ProjectContext";
import { AuthContext } from "../../context/AuthContext";
import projectService from "../../utils/projects";

import './ProjectCard.css';

function ProjectCard({ project }) {
	const { selectedProject,setSelectedProject } = useContext(ProjectContext);
	const { userData } = useContext(AuthContext);

	const [issueToDelete, setIssueToDelete] = useState(null);
	const [error, setError] = useState("");

	// SAVES THE SELECTED PROJECT IN PROJECT CONTEXT
	const handleClick = () => {
		setSelectedProject(project);
	}

	const handleRemoveProject = async (projectId) => {
	try {
		const result = await projectService.deleteProject(projectId);

		if (result.error) {
			setError(`Error removing project: ${result.message} (status ${result.status})`);
		} else {
			window.location.reload(); 
		}
	} catch (error) {
		setError(`Error removing project: ${error.message}`);
	}
	setIssueToDelete(null);
};


	return (
		<div className="project">
			<Link to={`/project`} onClick={handleClick} className="project--data">
				<div className="project--info">
					<h3>{project.name}</h3>
					<img src="../../../public/images/icons-card.png" alt="" />
					<p>{project.description}</p> {/* TODO ADD DESCRIPTION */}
				</div>
				<div className="project--chart">
					<DoughnutChart project={project} />
				</div>
			</Link>

			{/*DELETE BUTTON*/}
			{
				userData && userData.role === "projectManager" && (
					<div className="project-card__trash">
						<svg viewBox="0 0 448 512" fill="black" height="18px" width="18px"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								setIssueToDelete(project);
							}}>
							{" "}
							<path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
						</svg>
					</div>
				)
			}

			{/*CONFIRM DELETE*/}
			{issueToDelete && (
				<div className="delete-confirmation" onClick={() => setIssueToDelete(null)}>
					<div className="delete-confirmation__content" onClick={(e) => e.stopPropagation()}>
						<p>Are you sure you want to delete this project?</p>
						<div className="delete-confirmation__buttons">
							<button onClick={() => setIssueToDelete(null)} className="button-cancel">
								Cancel
							</button>
							<button onClick={() => handleRemoveProject(issueToDelete._id)} className="button-delete">
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default ProjectCard;