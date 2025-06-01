import express from "express";
import dotenv from "dotenv";
import clickUpRoutes from "./routes/clickUp";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/clickup", clickUpRoutes);

app.get("/ping", (req, res) => {
	res.send("pong");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});