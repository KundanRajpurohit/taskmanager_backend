import { Request, Response } from "express";
import * as authService from "./auth.service";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await authService.registerUser(email, password);

  res.status(201).json({
    message: "User registered successfully",
    userId: user.id,
  });
};
export const refresh = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
  
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token required" });
    }
  
    const token = await authService.refreshAccessToken(refreshToken);
  
    res.json(token);
  };
  
  export const logout = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
  
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token required" });
    }
  
    await authService.logoutUser(refreshToken);
  
    res.json({ message: "Logged out successfully" });
  };
  

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const tokens = await authService.loginUser(email, password);

  res.json(tokens);
};
