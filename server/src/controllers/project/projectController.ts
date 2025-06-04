//===============================================================================
// name: userController.ts
// desc: Controller of user with TELL WHAT FUNCTIONS THERE ARE
//=================================Common Imports================================
import Project, { projectInterface } from "../../models/project.ts";
import Task, { taskInterface } from "../../models/task.ts"
//================================Error Management===============================
import { ProjectDoesNotExist, TaskDoesNotExist } from "../../utils/errors/projectError.ts";
//===============================================================================

async function getProjectById(id: string) {
  const project = await Project.findById(id).populate("tasks");
  if (!project) throw new ProjectDoesNotExist();
  return project;
}

async function getAllProject() {
  const projects = await Project.find().populate("tasks");
  if (!projects || projects.length <= 0) throw new ProjectDoesNotExist();
  return projects;
}

async function createProject(data: projectInterface) {
  const newProject = new Project(data);
  if (!newProject) throw new ProjectDoesNotExist();

  await newProject.save();
  return newProject;
}

async function editProject(id: string, data: projectInterface) {
  const project = await Project.findByIdAndUpdate(id, data, { new: true }).populate("tasks");
  if (!project) throw new ProjectDoesNotExist();

  return project;
}

async function removeProject(id: string) {
  const project = await Project.findByIdAndDelete(id);
  if (!project) throw new ProjectDoesNotExist();

  return 1;
}

async function finalizeProject(id: string) {
  let project: projectInterface = (await Project.findById(id)) as projectInterface;
  if (!project) throw new ProjectDoesNotExist();

  project.isFinalize = true;

  const finalizeProject = await Project.findByIdAndUpdate(
    id, project, { new: true }).populate("tasks");
  if (!finalizeProject) throw new ProjectDoesNotExist();
  
  return finalizeProject;
}

async function createTask(projectId: string, taskData: taskInterface) {
  const newTask = new Task(taskData);
  await newTask.save();

  let project: projectInterface = (await Project.findById(projectId)) as projectInterface;
  if (!project) throw new ProjectDoesNotExist();
  project.tasks.push(newTask);

  const projectWithNewTask = await Project.findByIdAndUpdate(
    projectId, project, { new: true }).populate("tasks");
  if (!projectWithNewTask) throw new ProjectDoesNotExist();
  return projectWithNewTask;
}

async function editTask(projectId: string, taskId: string, taskData: taskInterface) {
  let project: projectInterface = (await Project.findById(projectId).populate("tasks")) as projectInterface;
  if (!project) throw new ProjectDoesNotExist();
  let task: taskInterface = (await Task.findById(taskId)) as taskInterface;
  if (!project.tasks.includes(task)) throw new TaskDoesNotExist();

  const editedTask = await Task.findByIdAndUpdate(
    taskId, taskData, { new: true });
  return editedTask;
}

async function deleteTask(projectId: string, taskId: string) {
  let project: projectInterface = (await Project.findById(projectId).populate("tasks")) as projectInterface;
  let task: taskInterface = (await Task.findById(taskId)) as taskInterface;
  const indexOfDelete = project.tasks.indexOf(task);
  if (indexOfDelete == -1) throw new TaskDoesNotExist();
  project.tasks.splice(indexOfDelete, 1);

  const projectWithDeletedTask = await Project.findByIdAndUpdate(
    projectId, project, { new: true }).populate("tasks");
    
  if (!projectWithDeletedTask) throw new ProjectDoesNotExist();
  return projectWithDeletedTask;
}

export default {
  getProjectById,
  getAllProject,
  createProject,
  editProject,
  removeProject,
  finalizeProject,
  createTask,
  editTask,
  deleteTask,
}