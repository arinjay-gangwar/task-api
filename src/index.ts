import express from "express";
import taskRoutes from "./routes/tasks";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Task Manager API is live!");
});

app.listen(PORT, () => {
  console.log(`Server running at Port ${PORT}`);
});
