import { Router, Request, Response } from "express";

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

  if (completedTasks.length > 0) {
    return res.json(completedTasks);
  } else {
    return res.status(404).json({ message: "No Completed Task found." });
  }
});

router.get("/:idx", (req: Request, res: Response) => {
  const { idx } = req.params;

  if (!idx) {
    return res.status(400).json({ message: "Task ID is required." });
  }

  const taskFind = tasks.find((t) => t.id === parseInt(idx));

  if (taskFind) {
    return res.json(taskFind);
  } else {
    return res.status(404).json({ message: "Task not found." });
  }
});

router.post("/", (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title || typeof title !== "string") {
    return res
      .status(400)
      .json({ error: "Title is required and must be a string." });
  }

  const newTask: Task = {
    id: nextId++,
    title,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put("/:idx", (req: Request, res: Response) => {
  const { idx } = req.params;
  const { title, completed } = req.body;

  if (!idx) {
    return res.status(400).json({ message: "Task ID is required." });
  }

  const taskFind = tasks.find((t) => t.id === parseInt(idx));

  if (taskFind) {
    taskFind.title = title;
    taskFind.completed = completed;
    res.status(200).json(taskFind);
  } else {
    return res.status(404).json({ message: "Task not found." });
  }
});

router.delete("/:idx", (req: Request, res: Response) => {
  const { idx } = req.params;

  if (!idx) {
    return res.status(400).json({ message: "Task ID is required." });
  }

  const taskIndex = tasks.findIndex((t) => t.id === parseInt(idx));

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    return res.status(200).json({ message: "Task deleted successfully." });
  } else {
    return res.status(404).json({ message: "Task not found." });
  }
});

export default router;
