import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import { ProjectContext } from "../../context/ProjectContext";
import { AuthContext } from "../../context/AuthContext";
import projectService from "../../utils/projects";

import './ProjectCard.css';

function ProjectCard({ project }) {
	const { selectedProject, setSelectedProject } = useContext(ProjectContext);
	const { userData } = useContext(AuthContext);

	const [issueToDelete, setIssueToDelete] = useState(null);
	const [error, setError] = useState("");

	const colorList = ['#FFB41D', '#F96E43', '#3D9DD8', '#F78BD8', '#189B5C', '#7CE55E'];
	const randomColor = colorList[Math.floor(Math.random() * colorList.length)];


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

	const ProgressBarChart = ({ project }) => {
		if (!project || !project.tasks || project.tasks.length === 0) {
			return;
		}

		const totalTasks = project.tasks.length;
		let completedTasks = project.tasks.filter(task => task.status == "Complete").length;
		const percentage = Math.round((completedTasks / totalTasks) * 100);

		return (
			<div className="progress-container">
				<div className="progress-bar" style={{ width: `${percentage}%` }} />
				<span className="progress-label">{percentage}% completed</span>
			</div>
		);
	};

	const randomIconIndex = Math.floor(Math.random() * 12) + 1;
	const iconPath = `/images/threeIcons/${randomIconIndex}.svg`;



	return (
		<div className="project" style={{ '--random-color': randomColor }}>
			<Link to={`/project`} onClick={handleClick} className="project--data">
				<div className="project--info">
					<h3>{project.name}</h3>
					<img src={iconPath} alt={`icon-${randomIconIndex}`} className="project--icons" />
					<p>{project.description}</p>
				</div>
				<ProgressBarChart project={project} />
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
							<button onClick={() => setIssueToDelete(null)} className="button-cancel button">
								Cancel
							</button>
							<button onClick={() => handleRemoveProject(issueToDelete._id)} className="button-delete button">
								Delete<i>!</i>
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default ProjectCard;