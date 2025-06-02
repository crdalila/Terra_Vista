import express from "express";
import dotenv from "dotenv";
import router from "./routes/router";
import clickUpRoutes from "./routes/clickUp";

dotenv.config();

const app = express();
app.use(express.json());

app.use("",router);
//app.use("/clickup", clickUpRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});