//===============================================================================
// name: mogoose.ts
// desc: Connects mongo
//===============================Dependency Imports==============================
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserModel from "../models/user";
import ProjectModel from "../models/project";
import TaskModel from "../models/task";
//===============================================================================

dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = 27017;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const seedData = async () => {
  // Clear existing data (optional, but good for clean seeding)
  await TaskModel.deleteMany({});
  await ProjectModel.deleteMany({});
  await UserModel.deleteMany({});
  console.log('Previous data cleared.');

  // 1. Create Tasks
  const task1 = new TaskModel({
    clickUpTaskId: 'task1001',
    name: 'B Implement User Login',
    requestType: 'New Item',
    status: 'With Feedback',
    priority: 2,
    requester: 'A John Doe',
    request: 'B User should be able to log in with email and password.',
    page: 'Login Page',
    isSend: false
  });

  const task2 = new TaskModel({
    clickUpTaskId: 'task1002',
    name: 'A Fix Header Overflow on Mobile',
    requestType: 'Design Issues',
    status: 'In Progress',
    priority: 1,
    requester: 'B Jane Smith',
    request: 'A Header overflows on mobile screens.',
    page: 'All Pages',
    device: 'Mobile',
    browser: 'Chrome',
    isSend: false
  });

  const task3 = new TaskModel({
    clickUpTaskId: 'task1003',
    name: 'Update Project Description',
    requestType: 'Requested Change',
    status: 'Complete',
    priority: 3,
    requester: 'Admin User',
    request: 'Update description for Project Alpha.',
    page: 'Project Details',
    isSend: true
  });

  const task4 = new TaskModel({
    clickUpTaskId: 'task1004',
    name: 'New Feature: Dark Mode Toggle',
    requestType: 'New Item',
    status: 'Assigned',
    priority: 2,
    requester: 'Mike Johnson',
    request: 'Add a dark mode toggle to the user interface.',
    page: 'Settings Page',
    isSend: false
  });


  await Promise.all([task1.save(), task2.save(), task3.save(), task4.save()]);
  console.log('Tasks created.');

  // 2. Create Projects, linking to Tasks
  const project1 = new ProjectModel({
    clickUpListId: 'list2001',
    clickUpFolderId: 'folder3001',
    clickUpSpaceId: 'space4001',
    name: 'Project Alpha',
    description: 'A cutting-edge web application.',
    notifications: ['Alpha Project Update', 'Alpha Sprint Review'],
    isFinalize: false,
    tasks: [task1._id, task2._id], // Link to tasks
  });

  const project2 = new ProjectModel({
    clickUpListId: 'list2002',
    clickUpFolderId: 'folder3002',
    clickUpSpaceId: 'space4002',
    name: 'Project Beta',
    description: 'Internal tool for team collaboration.',
    notifications: ['Beta Dev Meeting'],
    isFinalize: false,
    tasks: [task3._id, task4._id], // Link to tasks
  });

  const project3 = new ProjectModel({
    clickUpListId: 'list2003',
    clickUpFolderId: 'folder3003',
    clickUpSpaceId: 'space4003',
    name: 'Client X Website',
    description: 'Website redesign for Client X.',
    notifications: ['Website Launch', 'Client X Feedback'],
    isFinalize: true,
    tasks: [], // No tasks for this example
  });

  await Promise.all([project1.save(), project2.save(), project3.save()]);
  console.log('Projects created.');

  // 3. Create Users, linking to Projects
  const user1 = new UserModel({
    clickUpToken: 'cu_token_user1',
    clickUpWorkspaceId: 'ws_user1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: "$2b$10$NPqUdtlQYIZkJOQyprXLU.TlX579tZ5qr3EcMrPWVI4RXgWFexoly", // In a real app, hash this!
    role: 'admin',
    projects: [project1._id, project2._id, project3._id], // Admin sees all projects
  });

  const user2 = new UserModel({
    clickUpToken: 'cu_token_user2',
    clickUpWorkspaceId: 'ws_user2',
    name: 'Project Manager Jane',
    email: 'pm.jane@example.com',
    password: "$2b$10$NPqUdtlQYIZkJOQyprXLU.TlX579tZ5qr3EcMrPWVI4RXgWFexoly",
    role: 'projectManager',
    projects: [project1._id], // PM Jane manages Project Alpha
  });

  const user3 = new UserModel({
    clickUpToken: 'cu_token_user3',
    clickUpWorkspaceId: 'ws_user3',
    name: 'Client Bob',
    email: 'client.bob@example.com',
    password: "$2b$10$NPqUdtlQYIZkJOQyprXLU.TlX579tZ5qr3EcMrPWVI4RXgWFexoly",
    role: 'client',
    projects: [project3._id], // Client Bob has access to Client X Website
  });

  await Promise.all([user1.save(), user2.save(), user3.save()]);
  console.log('Users created.');

  // Optional: Verify population by fetching
  console.log('\n--- Verifying Populated Data ---');
  const adminUser = await UserModel.findOne({ email: 'admin@example.com' })
    .populate('projects')
    .exec();
  console.log(
    `Admin User Projects (${adminUser?.projects.length}):`,
    adminUser?.projects.map((p: any) => p.name), // Use 'any' or cast for simplicity in console.log
  );

  const projectAlpha = await ProjectModel.findOne({ name: 'Project Alpha' })
    .populate('tasks')
    .exec();
  console.log(
    `Project Alpha Tasks (${projectAlpha?.tasks.length}):`,
    projectAlpha?.tasks.map((t: any) => t.name), // Use 'any' or cast
  );
};

export const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`);
    await seedData();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}






