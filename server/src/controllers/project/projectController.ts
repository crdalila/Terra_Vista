//===============================================================================
// name: projectController.ts
//=================================Common Imports================================
import Project, { projectInterface } from "../../models/project.ts";
import Task, { taskInterface } from "../../models/task.ts"
//================================Error Management===============================
import { DataDoesNotExist, ProjectDoesNotExist, TaskDoesNotExist } from "../../utils/errors/projectError.ts";
//===============================================================================

async function getProjectById(id: string) {
  //Finds project, makes tasks model be inside
  const project = await Project.findById(id).populate("tasks");
  if (!project) throw new ProjectDoesNotExist();
  return project;
}

async function getAllProjects() {
  //Finds all projects, makes tasks model be inside
  const projects = await Project.find().populate("tasks");
  if (!projects || projects.length <= 0) throw new ProjectDoesNotExist();
  return projects;
}

async function createProject(data: projectInterface) {
  if (!data) throw new DataDoesNotExist();
  //Creates a new project using the data
  const newProject = new Project(data);
  if (!newProject) throw new ProjectDoesNotExist();

  await newProject.save();
  return newProject;
}

async function editProject(id: string, data: projectInterface) {
  if (!data) throw new DataDoesNotExist();
  //Finds project, updates project, makes tasks model be insides
  const project = await Project.findByIdAndUpdate(id, data, { new: true }).populate("tasks");
  if (!project) throw new ProjectDoesNotExist();
  return project;
}

async function removeProject(id: string) {
  // Finds and deletes project
  await Project.findByIdAndDelete(id);

  return 1;
}

async function finalizeProject(id: string) {
  //Finds project and sets isFinalize to true
  const finalizeProject = await Project.findByIdAndUpdate(
    id, { $set: { isFinalize: true } }, { new: true }).populate("tasks");
  if (!finalizeProject) throw new ProjectDoesNotExist();

  return finalizeProject;
}

async function createTask(projectId: string, taskData: taskInterface) {
  console.log("Task Data: ",taskData);
  if (!taskData) throw new DataDoesNotExist();
  //Creates new task
  const newTask = new Task(taskData);
  await newTask.save();

  let project = (await Project.findById(projectId));
  if (!project) throw new ProjectDoesNotExist();
  project.tasks.push(newTask);
  await project.save();
  return project;
}

async function editTask(projectId: string, taskId: string, taskData: taskInterface) {
  let project = (await Project.findById(projectId));
  if (!project) throw new ProjectDoesNotExist();
  let task: taskInterface = (await Task.findById(taskId)) as taskInterface;
  if (!task || !project.tasks.includes(task)) throw new TaskDoesNotExist();

  const editedTask = await Task.findByIdAndUpdate(
    taskId, taskData, { new: true });

  return editedTask;
}

async function deleteTask(projectId: string, taskId: string) {

  let project = (await Project.findById(projectId));
  if (!project) throw new ProjectDoesNotExist();

  let task: taskInterface = (await Task.findById(taskId)) as taskInterface;

  const indexOfDelete = project.tasks.indexOf(task);
  if (indexOfDelete == -1) throw new TaskDoesNotExist();
  project.tasks.splice(indexOfDelete, 1);
  project.save();

  return project;
}

export default {
  getProjectById,
  getAllProjects,
  createProject,
  editProject,
  removeProject,
  finalizeProject,
  createTask,
  editTask,
  deleteTask,
}