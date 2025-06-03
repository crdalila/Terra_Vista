//===============================================================================
// name: app.ts
// desc: 
//===============================Dependency Imports==============================
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
//=================================Common Imports================================
import router from "./routes/router.ts";
import { connectDB } from "./config/mongoose.ts";
//import clickUpRoutes from "./routes/clickUp";
//===============================================================================

dotenv.config();
connectDB();
const app = express();

const CLIENT_URL = process.env.CLIENT_URL;
const corsOptions = {
    origin: CLIENT_URL,
    credentials: true // Permitir envío de cookies
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/",router);
//app.use("/clickup", clickUpRoutes);

const PORT = process.env.APP_PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});