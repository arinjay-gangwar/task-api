import { Router, Request, Response } from "express";
import { validateId } from "../middleware/validateId";
import { BadRequestError } from "../middleware/error";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const router = Router();
let tasks: Task[] = [];
let nextId = 1;

router.get("/", (req: Request, res: Response) => {
  res.json(tasks);
});

router.get("/completed", (req: Request, res: Response) => {
  const completedTasks = tasks.filter((t) => t.completed === true);

  return res.status(200).json(completedTasks);
});

router.use("/:id", validateId);

router.get("/:id", (req: Request, res: Response) => {
  const id: number = (req as any).taskId;

  const taskFind = tasks.find((t) => t.id === id);

  return taskFind
    ? res.status(200).json(taskFind)
    : res.status(404).json({ error: "Task not found." });
});

router.post("/", (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title || typeof title !== "string") {
    throw new BadRequestError("Title is required and must be a string.");
  }

  const newTask: Task = {
    id: nextId++,
    title,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put("/:id", (req: Request, res: Response) => {
  const id: number = (req as any).taskId;
  const { title, completed } = req.body;

  if (typeof completed !== "boolean") {
    throw new BadRequestError("Completed must be a boolean.");
  } else if (!title || typeof title !== "string") {
    throw new BadRequestError("Title is required and must be a string.");
  }

  const taskFind = tasks.find((t) => t.id === id);

  if (taskFind) {
    taskFind.title = title;
    taskFind.completed = completed;
    res.status(200).json(taskFind);
  } else {
    return res.status(404).json({ error: "Task not found." });
  }
});

router.delete("/:id", (req: Request, res: Response) => {
  const id: number = (req as any).taskId;

  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    return res.status(200).json({ message: "Task deleted successfully." });
  } else {
    return res.status(404).json({ error: "Task not found." });
  }
});

router.patch("/:id", (req: Request, res: Response) => {
  const id: number = (req as any).taskId;
  const { completed } = req.body;

  if (typeof completed !== "boolean") {
    throw new BadRequestError("Completed must be a boolean.");
  }

  const taskFind = tasks.find((t) => t.id === id);

  if (taskFind) {
    taskFind.completed = completed;
    res.status(200).json(taskFind);
  } else {
    return res.status(404).json({ error: "Task not found." });
  }
});

export default router;
