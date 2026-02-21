import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";

import { authMiddleware } from "./middlewares/auth.middleware";


import taskRoutes from "./modules/tasks/task.routes";





const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.get("/protected", authMiddleware, (req, res) => {
    res.json({
      message: "You are authenticated",
      user: req.user,
    });
  });
  app.use("/tasks", taskRoutes);


export default app;
