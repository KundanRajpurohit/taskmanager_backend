import { Request, Response } from "express";
import * as taskService from "./task.service";

export const create = async (req: Request, res: Response) => {
  const { title } = req.body;
  const userId = req.user!.userId;

  const task = await taskService.createTask(userId, title);
  res.status(201).json(task);
};

export const getAll = async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { page, limit, status, search } = req.query;

  const tasks = await taskService.getTasks({
    userId,
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    status:
      status !== undefined ? status === "true" : undefined,
    search: search as string | undefined,
  });

  res.json(tasks);
};

export const update = async (req: Request, res: Response) => {
  const { title } = req.body;
  const id = req.params.id as string;

  const userId = req.user!.userId;

  await taskService.updateTask(id, userId, title);
  res.json({ message: "Task updated" });
};

export const remove = async (req: Request, res: Response) => {
    const id = req.params.id as string;

  const userId = req.user!.userId;

  await taskService.deleteTask(id, userId);
  res.json({ message: "Task deleted" });
};

export const toggle = async (req: Request, res: Response) => {
    const id = req.params.id as string;

  const userId = req.user!.userId;

  const task = await taskService.toggleTaskStatus(id, userId);
  res.json(task);
};
