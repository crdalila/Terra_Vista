//===============================================================================
// name: projectController.ts
//=================================Common Imports================================
import { Types } from "mongoose";
import axios from "axios";
import Project, { projectInterface } from "../../models/project.ts";
import Task, { requestEnum, requestOrder, statusEnum, statusOrder, taskInterface } from "../../models/task.ts"
//================================Error Management===============================
import { DataDoesNotExist, ProjectDoesNotExist, TaskDoesNotExist } from "../../utils/errors/projectError.ts";
import { removeFile } from "../../utils/middlewares/multerMiddleware.ts";
import { projectSelect } from "../../utils/modelsSelect.ts";
//===============================================================================

const CLICKUP_API_URL = "https://api.clickup.com/api/v2";
const CLICKUP_TOKEN = process.env.CLICKUP_API_TOKEN;

async function getProjectById(id: string) {
  //Finds project, makes tasks model be inside
  const project = await Project.findById(id).populate("tasks").select(projectSelect);
  if (!project) throw new ProjectDoesNotExist();
  return project;
}

async function getAllProjects() {
  //Finds all projects, makes tasks model be inside
  const projects = await Project.find().populate("tasks").select(projectSelect);
  if (!projects || projects.length <= 0) throw new ProjectDoesNotExist();
  return projects;
}

async function getAllProjectsNotifs() {
  //Finds all projects, makes tasks model be inside
  const projects = await Project.find().select(projectSelect);
  if (!projects || projects.length <= 0) throw new ProjectDoesNotExist();
  let projectsNotif: String[] = [];
  projects.forEach((project) => {
    project.notifications.forEach((notif) => projectsNotif.push(notif));
  });
  return projectsNotif;
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
  const project = await Project.findByIdAndUpdate(id, data, { new: true }).populate("tasks").select(projectSelect);
  if (!project) throw new ProjectDoesNotExist();
  return project;
}

async function removeProject(id: string) {
  const project = await Project.findById(id);

  if (!project) {
    throw new Error("Project not found");
  }

  const webhookId = project.clickUpWebhookId;

  if (webhookId) {
    try {
      await axios.delete(`${CLICKUP_API_URL}/webhook/${webhookId}`, {
        headers: {
          Authorization: CLICKUP_TOKEN,
        },
      });
      console.log(`Webhook ${webhookId} successfully deleted.`);
    } catch (err: any) {
      console.warn(`Could not delete webhook ${webhookId}:`, err.response?.data || err.message);
      // Puedes decidir si esto debe interrumpir o no la eliminación del proyecto
    }
  }

  await Project.findByIdAndDelete(id);
  return 1;

}

async function finalizeProject(id: string) {
  //Finds project and sets isFinalize to true
  const finalizeProject = await Project.findByIdAndUpdate(
    id, { $set: { isFinalize: true } }, { new: true }).populate("tasks").select(projectSelect);
  if (!finalizeProject) throw new ProjectDoesNotExist();

  return finalizeProject;
}

async function createTask(projectId: string, taskData: taskInterface) {
  if (!taskData) throw new DataDoesNotExist();
  //Creates new task
  const newTask = new Task(taskData);
  await newTask.save();
  let project = (await Project.findById(projectId).populate("tasks").select(projectSelect));
  if (!project) throw new ProjectDoesNotExist();
  project.tasks.push(newTask);

  await project.save();
  return project;
}

async function editTask(projectId: string, taskId: string, taskData: taskInterface) {

  let project = (await Project.findById(projectId).populate("tasks").select(projectSelect));
  if (!project) throw new ProjectDoesNotExist();


  if (!project.tasks.some((myTask) => {
    let stringId = (myTask as taskInterface & { _id: Types.ObjectId; })
      ._id.toString();
    return stringId == taskId;
  })) throw new TaskDoesNotExist();

  const editedTask = await Task.findByIdAndUpdate(
    taskId, taskData, { new: true });

  return editedTask;
}

async function deleteTask(projectId: string, taskId: string) {

  let project = (await Project.findById(projectId).populate("tasks").select(projectSelect));
  if (!project) throw new ProjectDoesNotExist();

  let task: taskInterface = (await Task.findById(taskId)) as taskInterface;


  if (!project.tasks.some((myTask) => {
    let stringId = (myTask as taskInterface & { _id: Types.ObjectId; })
      ._id.toString();
    return stringId == taskId;
  })) throw new TaskDoesNotExist();

  removeFile(task.screenshots as string);
  await Task.findByIdAndDelete(task);

  return project;
}


function getFilteredTasks(tasks: [taskInterface], filter: String) {
  switch (filter.toString()) {
    case "request":
      return tasks.sort((a, b) => {
        return (requestOrder.indexOf(a.requestType as requestEnum)) -
          (requestOrder.indexOf(b.requestType as requestEnum));
      });
    case "status":
      return tasks.sort((a, b) => {
        return (statusOrder.indexOf(a.status as statusEnum)) -
          (statusOrder.indexOf(b.status as statusEnum));
      });

    case "requester":
      return tasks.sort((a, b) => {
        return parseInt(a.requester.valueOf()) - parseInt(b.requester.valueOf());
      });
    case "date":
      return tasks.sort((a, b) => {
        return (a.inputDate.valueOf()) - (b.inputDate.valueOf());
      });
    case "send":
      return tasks.sort((a, b) => {
        return Number(b.isSend) - Number(a.isSend);
      });
    default:
      return tasks;
  }
}

export default {
  getProjectById,
  getAllProjects,
  createProject,
  getFilteredTasks,
  getAllProjectsNotifs,
  editProject,
  removeProject,
  finalizeProject,
  createTask,
  editTask,
  deleteTask,
}