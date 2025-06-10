//===============================================================================
// name: app.ts
// desc: The entry point to the backend
//===============================Dependency Imports==============================
import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
//=================================Common Imports================================
import router from "./routes/router.ts";
import { connectDB } from "./config/mongoose.ts";
import clickUpRoutes from "./routes/clickUpRouter.ts";
//===============================================================================

dotenv.config();
connectDB();
const app = express();
app.disable("x-powered-by");
app.use(express.static("public"));

const CLIENT_URL = process.env.CLIENT_URL;
const corsOptions = {
    origin: CLIENT_URL,
    credentials: true // Allows sending coockies
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/",router);
app.use("/clickup", clickUpRoutes);


const PORT = process.env.DOCKER_PORT || 3000;
app.listen(3000, () => {
	console.log(`Server is running on port ${PORT}`);
});