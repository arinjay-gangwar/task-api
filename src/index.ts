import express, { NextFunction } from "express";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";
import { authenticate } from "./middleware/auth";
import { errorHandler } from "./middleware/error";

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/tasks", authenticate, taskRoutes);

// 404 fallback
app.use((req, res) => res.status(404).json({ error: "Not Found" }));
// Error middleware
app.use(errorHandler);

app.listen(3000, () => console.log("Server running"));
